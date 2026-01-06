export class DocumentExporter {
  static exportToJSON(content: any, title: string) {
    const dataStr = JSON.stringify(content, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${title}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  static exportToCSV(data: any[], title: string) {
    if (!Array.isArray(data) || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(",");

    const csvRows = data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    );

    const csvContent = [csvHeaders, ...csvRows].join("\n");
    const dataUri =
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);

    const exportFileDefaultName = `${title}.csv`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  static exportToMarkdown(content: string, title: string) {
    const markdownContent = `# ${title}\n\n${content}`;
    const dataUri =
      "data:text/markdown;charset=utf-8," + encodeURIComponent(markdownContent);

    const exportFileDefaultName = `${title}.md`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  static exportCanvasToPNG(canvas: HTMLCanvasElement, title: string) {
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", url);
      linkElement.setAttribute("download", `${title}.png`);
      linkElement.click();

      URL.revokeObjectURL(url);
    }, "image/png");
  }

  static exportTasksToSheet(tasks: any[], title: string) {
    // Format tasks for spreadsheet export
    const formattedTasks = tasks.map((task) => ({
      Task: task.text || "",
      Status: task.completed ? "Completed" : "Pending",
      Created: new Date(task.id).toLocaleDateString(),
      Priority: "Medium", // Default priority
    }));

    this.exportToCSV(formattedTasks, `${title}_tasks`);
  }

  static exportDocument(
    documentType: string,
    content: any,
    title: string,
    canvas?: HTMLCanvasElement
  ) {
    switch (documentType) {
      case "writing":
        this.exportToMarkdown(content.toString(), title);
        break;
      case "drawing":
        if (canvas) {
          this.exportCanvasToPNG(canvas, title);
        }
        break;
      case "planning":
        this.exportTasksToSheet(content, title);
        break;
      default:
        this.exportToJSON(content, title);
    }
  }
}
