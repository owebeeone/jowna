export function downloadHtmlFile(fileName: string, html: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  downloadBlobFile(fileName, blob);
}

export function downloadSvgFile(fileName: string, svg: SVGSVGElement): void {
  const svgMarkup = serializeSvgForDownload(svg);
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  downloadBlobFile(fileName, blob);
}

export function downloadBlobFile(fileName: string, blob: Blob): void {
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

export function toSvgFileName(datasetName: string): string {
  const normalized = datasetName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const base = normalized.length > 0 ? normalized : "dataset-chart";
  return `${base}.svg`;
}

function serializeSvgForDownload(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  const exportBounds = resolveExportBounds(svg, clone);
  clone.setAttribute(
    "viewBox",
    `${exportBounds.x} ${exportBounds.y} ${exportBounds.width} ${exportBounds.height}`,
  );
  clone.setAttribute("width", String(exportBounds.width));
  clone.setAttribute("height", String(exportBounds.height));
  clone.setAttribute("overflow", "visible");

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `
    .chart-wedge-label{fill:#0e2b1f;font-weight:600}
    .chart-center-disc{fill:#f4faf7;stroke:#c4d8cc;stroke-width:1.4}
    .chart-center-title{font-size:13px;font-weight:700;fill:#102a1f}
    .chart-center-metric{font-size:15px;font-weight:700;fill:#174936}
    .chart-center-sub{font-size:11px;fill:#4f675d}
    .chart-key-line{fill:none;stroke:#111111;stroke-linecap:round;stroke-linejoin:round}
    .chart-key-text-box{fill:#ffffff}
    .chart-key-text{fill:#102a1f;font-weight:600}
    .chart-key-color-box{shape-rendering:geometricPrecision}
  `;
  clone.insertBefore(style, clone.firstChild);

  return `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
}

interface ExportBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

function resolveExportBounds(sourceSvg: SVGSVGElement, clonedSvg: SVGSVGElement): ExportBounds {
  const fallback = parseViewBox(clonedSvg.getAttribute("viewBox")) ??
    parseWidthHeight(clonedSvg.getAttribute("width"), clonedSvg.getAttribute("height")) ?? {
      x: 0,
      y: 0,
      width: 640,
      height: 640,
    };

  const measured = measureRenderedBounds(sourceSvg);
  if (!measured) {
    return fallback;
  }

  const padding = 16;
  const x = Math.floor(measured.x - padding);
  const y = Math.floor(measured.y - padding);
  const width = Math.ceil(measured.width + padding * 2);
  const height = Math.ceil(measured.height + padding * 2);
  if (width <= 0 || height <= 0) {
    return fallback;
  }
  return { x, y, width, height };
}

function measureRenderedBounds(svg: SVGSVGElement): DOMRect | null {
  try {
    if (typeof svg.getBBox !== "function") {
      return null;
    }
    const box = svg.getBBox();
    if (
      Number.isFinite(box.x) &&
      Number.isFinite(box.y) &&
      Number.isFinite(box.width) &&
      Number.isFinite(box.height) &&
      box.width > 0 &&
      box.height > 0
    ) {
      return box;
    }
  } catch {
    return null;
  }
  return null;
}

function parseViewBox(value: string | null): ExportBounds | null {
  if (!value) {
    return null;
  }
  const parts = value
    .trim()
    .split(/\s+/)
    .map((part) => Number.parseFloat(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) {
    return null;
  }
  const [x, y, width, height] = parts;
  if (width <= 0 || height <= 0) {
    return null;
  }
  return { x, y, width, height };
}

function parseWidthHeight(widthRaw: string | null, heightRaw: string | null): ExportBounds | null {
  const width = Number.parseFloat(widthRaw ?? "");
  const height = Number.parseFloat(heightRaw ?? "");
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return null;
  }
  return { x: 0, y: 0, width, height };
}
