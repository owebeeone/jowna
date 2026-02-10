import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadHtmlFile, toSvgFileName } from "./download";

describe("download helpers", () => {
  let originalCreateObjectUrl: typeof URL.createObjectURL;
  let originalRevokeObjectUrl: typeof URL.revokeObjectURL;
  let originalDocument: typeof document | undefined;

  beforeEach(() => {
    vi.useFakeTimers();
    originalCreateObjectUrl = URL.createObjectURL;
    originalRevokeObjectUrl = URL.revokeObjectURL;
    originalDocument = globalThis.document;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      writable: true,
      value: originalCreateObjectUrl,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      writable: true,
      value: originalRevokeObjectUrl,
    });
    if (originalDocument === undefined) {
      delete (globalThis as { document?: Document }).document;
    } else {
      vi.stubGlobal("document", originalDocument);
    }
  });

  it("keeps object URL alive briefly so large files can download", () => {
    const click = vi.fn();
    const remove = vi.fn();
    const anchor = {
      href: "",
      download: "",
      rel: "",
      style: { display: "" },
      click,
      remove,
    };
    const append = vi.fn();
    const mockDocument = {
      createElement: vi.fn(() => anchor),
      body: { append },
    };
    vi.stubGlobal("document", mockDocument);

    const createObjectUrl = vi.fn(() => "blob:jowna-test");
    const revokeObjectUrl = vi.fn();

    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      writable: true,
      value: createObjectUrl,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      writable: true,
      value: revokeObjectUrl,
    });

    downloadHtmlFile("chart.html", "<!doctype html><html></html>");

    expect(createObjectUrl).toHaveBeenCalledTimes(1);
    expect(mockDocument.createElement).toHaveBeenCalledWith("a");
    expect(append).toHaveBeenCalledWith(anchor);
    expect(click).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(anchor.href).toBe("blob:jowna-test");
    expect(anchor.download).toBe("chart.html");
    expect(anchor.rel).toBe("noopener");
    expect(anchor.style.display).toBe("none");
    expect(revokeObjectUrl).not.toHaveBeenCalled();

    vi.advanceTimersByTime(5_000);

    expect(revokeObjectUrl).toHaveBeenCalledWith("blob:jowna-test");
  });

  it("normalizes svg names", () => {
    expect(toSvgFileName("HOT01 0010M")).toBe("HOT01-0010M.svg");
  });
});
