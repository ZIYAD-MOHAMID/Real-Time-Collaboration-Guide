"use client";

import { useState, useEffect, useCallback } from "react";
import { CRDTProvider } from "@/lib/crdt/provider";
import { Button } from "@/components/ui/Button";

export function WritingEditor({
  crdtProvider,
  onSave,
}: {
  crdtProvider: CRDTProvider | null;
  onSave?: () => Promise<void>;
}) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState("16");

  // Update stats (words, chars, reading time)
  const updateStats = useCallback((text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setCharCount(text.length);
    setReadingTime(Math.ceil(words / 200));
  }, []);

  // Auto-save function
  const handleAutoSave = useCallback(async () => {
    if (!crdtProvider || isSaving) return;
    setIsSaving(true);
    try {
      await crdtProvider.syncWithDatabase();

      if (onSave) await onSave();
      setLastSaved(new Date());
      console.log("Writing content auto-saved");
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setIsSaving(false);
    }
  }, [crdtProvider, isSaving, onSave]);

  // Load initial content and observe CRDT changes
  useEffect(() => {
    if (!crdtProvider) return;
    const yText = crdtProvider.getText("content");
    setContent(yText.toString());
    updateStats(yText.toString());

    const observer = () => {
      const newContent = yText.toString();
      setContent(newContent);
      updateStats(newContent);
      // Auto-save after 1s of inactivity
      const timeout = setTimeout(handleAutoSave, 1000);
      return () => clearTimeout(timeout);
    };

    yText.observe(observer);
    return () => yText.unobserve(observer);
  }, [crdtProvider, updateStats, handleAutoSave]);

  // Handle textarea input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateStats(newContent);

    if (crdtProvider) {
      const yText = crdtProvider.getText("content");
      yText.delete(0, yText.length);
      yText.insert(0, newContent);
    }
  };

  // Simple formatting: uppercase, lowercase, clear
  const handleFormat = (format: "uppercase" | "lowercase" | "clear") => {
    if (!crdtProvider) return;
    const yText = crdtProvider.getText("content");
    let formatted = yText.toString();

    if (format === "uppercase") formatted = formatted.toUpperCase();
    else if (format === "lowercase") formatted = formatted.toLowerCase();
    else if (format === "clear") formatted = "";

    yText.delete(0, yText.length);
    yText.insert(0, formatted);
    setContent(formatted);
    updateStats(formatted);
  };

  const exportContent = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isFullscreen ? "fixed inset-0 z-50 bg-background" : ""
      }`}
    >
      {/* Toolbar */}
      <div className="border-b bg-muted/30 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 text-xs border border-input rounded"
          >
            {[12, 14, 16, 18, 20, 24].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat("uppercase")}
            title="Uppercase"
          >
            Aa
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat("lowercase")}
            title="Lowercase"
          >
            aa
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat("clear")}
            title="Clear"
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={exportContent}
            title="Export"
          >
            Export
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            disabled={!onSave}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b bg-muted/20 px-4 py-1 flex justify-between text-xs text-muted-foreground">
        <div className="flex space-x-4">
          <span>Words: {wordCount}</span>
          <span>Chars: {charCount}</span>
          <span>Reading: {readingTime} min</span>
        </div>
        {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-full p-4 border border-input rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          style={{ fontSize: `${fontSize}px` }}
          placeholder="Start writing..."
        />
      </div>

      {/* Auto-save status */}
      <div className="border-t bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {isSaving ? (
            <span className="text-blue-600 animate-pulse">Saving...</span>
          ) : lastSaved ? (
            <span className="text-green-600">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>Ready</span>
          )}
        </div>
        <div>Auto-save enabled</div>
      </div>
    </div>
  );
}
