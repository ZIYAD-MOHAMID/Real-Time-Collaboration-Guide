"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CRDTProvider } from "@/lib/crdt/provider";
import { Button } from "@/components/ui/Button";

export function DrawingEditor({
  crdtProvider,
  canvasRef,
  onSave,
}: {
  crdtProvider: CRDTProvider | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onSave?: () => Promise<void>;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<
    "pen" | "eraser" | "rectangle" | "circle"
  >("pen");
  const [currentColor, setCurrentColor] = useState("#3b82f6");
  const [lineWidth, setLineWidth] = useState(2);

  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  const colors = [
    "#000000",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#6b7280",
  ];

  const redrawCanvas = useCallback(() => {
    if (!crdtProvider || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const paths = crdtProvider.getMap("drawing").get("paths") || [];

    paths.forEach((path: any) => {
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.lineWidth;
      ctx.lineCap = "round";

      if (path.type === "line") {
        ctx.beginPath();
        ctx.moveTo(path.from.x, path.from.y);
        ctx.lineTo(path.to.x, path.to.y);
        ctx.stroke();
      } else if (path.type === "rectangle") {
        ctx.strokeRect(path.x, path.y, path.width, path.height);
      } else if (path.type === "circle") {
        ctx.beginPath();
        ctx.arc(path.x, path.y, path.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });
  }, [crdtProvider, canvasRef]);

  const handleAutoSave = useCallback(async () => {
    if (!crdtProvider || isSaving || !onSave) return;
    setIsSaving(true);
    try {
      await crdtProvider.syncWithDatabase();
      if (onSave) await onSave();
      setLastSaved(new Date());
    } catch (err) {
      console.error("Auto-save failed", err);
    } finally {
      setIsSaving(false);
    }
  }, [crdtProvider, isSaving, onSave]);

  useEffect(() => {
    if (!crdtProvider || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      redrawCanvas();
    };
    resize();
    window.addEventListener("resize", resize);

    const yMap = crdtProvider.getMap("drawing");

    const startDrawing = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      startPos.current = { x, y };
      lastPos.current = { x, y };
      setIsDrawing(true);

      if (currentTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = lineWidth * 3;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
      }
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (currentTool === "pen" || currentTool === "eraser") {
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        const paths = yMap.get("paths") || [];
        paths.push({
          type: "line",
          from: { ...lastPos.current },
          to: { x, y },
          color: currentColor,
          lineWidth,
          tool: currentTool,
        });
        yMap.set("paths", paths);
        lastPos.current = { x, y };
      } else if (currentTool === "rectangle" || currentTool === "circle") {
        redrawCanvas();
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
        if (currentTool === "rectangle") {
          ctx.strokeRect(
            startPos.current.x,
            startPos.current.y,
            x - startPos.current.x,
            y - startPos.current.y,
          );
        } else {
          const radius = Math.hypot(
            x - startPos.current.x,
            y - startPos.current.y,
          );
          ctx.beginPath();
          ctx.arc(
            startPos.current.x,
            startPos.current.y,
            radius,
            0,
            2 * Math.PI,
          );
          ctx.stroke();
        }
      }
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const endX = lastPos.current.x;
      const endY = lastPos.current.y;

      if (currentTool === "rectangle" || currentTool === "circle") {
        const paths = yMap.get("paths") || [];
        if (currentTool === "rectangle") {
          paths.push({
            type: "rectangle",
            x: Math.min(startPos.current.x, endX),
            y: Math.min(startPos.current.y, endY),
            width: Math.abs(endX - startPos.current.x),
            height: Math.abs(endY - startPos.current.y),
            color: currentColor,
            lineWidth,
          });
        } else {
          const radius = Math.hypot(
            endX - startPos.current.x,
            endY - startPos.current.y,
          );
          paths.push({
            type: "circle",
            x: startPos.current.x,
            y: startPos.current.y,
            radius,
            color: currentColor,
            lineWidth,
          });
        }
        yMap.set("paths", paths);
        redrawCanvas();
      }
      setIsDrawing(false);
      handleAutoSave();
    };

    // Add event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    redrawCanvas();

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
      window.removeEventListener("resize", resize);
    };
  }, [
    crdtProvider,
    canvasRef,
    currentTool,
    currentColor,
    lineWidth,
    isDrawing,
    redrawCanvas,
    handleAutoSave,
  ]);

  const clearCanvas = () => {
    if (!crdtProvider || !canvasRef.current) return;
    const yMap = crdtProvider.getMap("drawing");
    yMap.set("paths", []);
    const ctx = canvasRef.current.getContext("2d");
    if (ctx)
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const exportCanvas = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "drawing.png";
    a.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-muted/30 px-4 py-2 flex flex-wrap items-center gap-2">
        {/* Tools */}
        {["pen", "eraser", "rectangle", "circle"].map((tool) => (
          <Button
            key={tool}
            variant={currentTool === tool ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentTool(tool as any)}
          >
            {tool}
          </Button>
        ))}

        {/* Colors */}
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            style={{ backgroundColor: color }}
            className={`w-6 h-6 rounded border-2 ${
              currentColor === color ? "border-ring" : "border-border"
            }`}
          />
        ))}

        {/* Line width */}
        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="border px-2 py-1 rounded text-xs"
        >
          {[1, 2, 4, 8].map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>

        <Button onClick={clearCanvas} size="sm">
          Clear
        </Button>
        <Button onClick={exportCanvas} size="sm">
          Export
        </Button>
        <Button onClick={onSave} size="sm" disabled={!onSave}>
          Save
        </Button>
      </div>

      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full border border-input rounded-md bg-white cursor-crosshair"
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="border-t bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {isSaving
            ? "Saving..."
            : lastSaved
              ? `Saved at ${lastSaved.toLocaleTimeString()}`
              : "Ready to draw"}
        </span>
        <span>Auto-save enabled</span>
      </div>
    </div>
  );
}
