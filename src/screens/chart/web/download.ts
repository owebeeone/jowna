export function downloadHtmlFile(fileName: string, html: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  downloadBlobFile(fileName, blob);
}

export function downloadSvgFile(fileName: string, svg: SVGSVGElement): void {
  const svgMarkup = serializeSvgForDownload(svg);
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  downloadBlobFile(fileName, blob);
}

export function toSvgFileName(datasetName: string): string {
  const normalized = datasetName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const base = normalized.length > 0 ? normalized : "dataset-chart";
  return `${base}.svg`;
}

function downloadBlobFile(fileName: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  anchor.style.display = "none";

  if (document.body) {
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  } else {
    anchor.click();
  }

  // Keep the object URL around briefly so large downloads are not truncated.
  const revokeDelayMs = 5_000;
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, revokeDelayMs);
}

function serializeSvgForDownload(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  const viewBox = clone.getAttribute("viewBox");
  if (viewBox) {
    const parts = viewBox
      .trim()
      .split(/\s+/)
      .map((part) => Number.parseFloat(part));
    if (parts.length === 4 && parts.every((part) => Number.isFinite(part))) {
      clone.setAttribute("width", String(parts[2]));
      clone.setAttribute("height", String(parts[3]));
    }
  }

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `
    .chart-wedge-label{fill:#0e2b1f;font-weight:600}
    .chart-center-disc{fill:#f4faf7;stroke:#c4d8cc;stroke-width:1.4}
    .chart-center-title{font-size:13px;font-weight:700;fill:#102a1f}
    .chart-center-metric{font-size:15px;font-weight:700;fill:#174936}
    .chart-center-sub{font-size:11px;fill:#4f675d}
  `;
  clone.insertBefore(style, clone.firstChild);

  return `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
}
