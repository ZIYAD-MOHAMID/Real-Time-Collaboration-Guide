"use client";

import { useState, useEffect, useRef } from "react";
import { CRDTProvider } from "@/lib/crdt/provider";
import { Button } from "@/components/ui/Button";

export function PlanningEditor({
  crdtProvider,
  onSave,
}: {
  crdtProvider: CRDTProvider | null;
  onSave?: () => Promise<void>;
}) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "name">("date");

  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!crdtProvider) return;
    console.log(crdtProvider);

    const yArray = crdtProvider.getArray("tasks");

    const observer = () => {
      try {
        setTasks(yArray.toJSON());
        setTimeout(handleAutoSave, 1000);
      } catch (err) {
        console.error("Yjs observer error:", err);
      }
    };

    yArray.observe(observer);
    return () => yArray.unobserve(observer);
  }, [crdtProvider]);

  const handleAutoSave = async () => {
    if (!crdtProvider || isSaving || !onSave) return;
    setIsSaving(true);
    try {
      await crdtProvider.syncWithDatabase();
      console.log("Planning tasks auto-saved");
      setLastSaved(new Date());
    } catch (error) {
      console.error("Planning auto-save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addTask = () => {
    if (!crdtProvider || !newTaskText.trim()) return;
    const yArray = crdtProvider.getArray("tasks");
    yArray.push([
      {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        priority: "medium",
        createdAt: new Date().toISOString(),
        dueDate: null,
        tags: [],
      },
    ]);
    setNewTaskText("");
  };

  const updateTask = (id: number, updates: Partial<any>) => {
    if (!crdtProvider) return;
    const yArray = crdtProvider.getArray("tasks");
    const index = yArray.toArray().findIndex((t) => t.id === id);
    if (index === -1) return;
    const task = yArray.get(index);
    yArray.delete(index);
    yArray.insert(index, [{ ...task, ...updates }]);
  };

  const deleteTask = (id: number) => {
    if (!crdtProvider) return;
    const yArray = crdtProvider.getArray("tasks");
    const index = yArray.toArray().findIndex((t) => t.id === id);
    if (index !== -1) yArray.delete(index);
  };

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) updateTask(id, { completed: !task.completed });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "date")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === "name") return a.text.localeCompare(b.text);
    return 0;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4">
        {/* Stats Bar */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex space-x-4">
              <span className="font-medium">Total: {taskStats.total}</span>
              <span className="text-blue-600">Active: {taskStats.active}</span>
              <span className="text-green-600">
                Completed: {taskStats.completed}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {taskStats.total > 0
                ? Math.round((taskStats.completed / taskStats.total) * 100)
                : 0}
              % complete
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button onClick={addTask} size="sm" disabled={!newTaskText.trim()}>
              Add Task
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              disabled={!onSave}
            >
              Save
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                ? "No active tasks"
                : "No tasks yet. Add one above!"}
            </div>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center space-x-3 p-3 border border-input rounded-md transition-colors ${
                  task.completed ? "bg-muted/30" : "bg-background"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <div
                    className={`flex items-center space-x-2 ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    <span className="font-medium">{task.text}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                    <span>
                      Created {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                    {task.dueDate && (
                      <span>
                        • Due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      updateTask(task.id, { priority: e.target.value })
                    }
                    className="px-2 py-1 text-xs border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          {isSaving ? (
            <span className="flex items-center text-blue-600">
              Saving tasks...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center text-green-600">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>Ready to plan</span>
          )}
        </div>
        <div className="text-xs">Auto-save enabled</div>
      </div>
    </div>
  );
}
