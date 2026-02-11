import type { Dataset, Project } from "../../domain";

export const DATASET_ZIP_MIME_TYPE = "application/zip";

interface DatasetZipInput {
  project: Project;
  datasets: Dataset[];
  exportedAt: string;
}

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

interface ManifestDatasetEntry {
  id: string;
  name: string;
  file: string;
}

interface ZipManifest {
  format: "jowna.datasets.zip";
  exportedAt: string;
  project: {
    id: string;
    name: string;
  };
  datasets: ManifestDatasetEntry[];
}

const TSV_HEADER = ["source_row", "magnitude", "path", "url", "description", "attributes"];
const textEncoder = new TextEncoder();
const crcTable = buildCrc32Table();

export function toDatasetsZipFileName(projectName: string): string {
  const normalized = projectName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const base = normalized.length > 0 ? normalized : "project";
  return `${base}-datasets.zip`;
}

export function createProjectDatasetsZipBlob(input: DatasetZipInput): Blob {
  const entries = createDatasetEntries(input);
  const zipBytes = buildStoredZip(entries);
  return new Blob([zipBytes], { type: DATASET_ZIP_MIME_TYPE });
}

function createDatasetEntries(input: DatasetZipInput): ZipEntry[] {
  const entries: ZipEntry[] = [];
  const usedNames = new Set<string>();
  const manifestDatasets: ManifestDatasetEntry[] = [];

  for (const [index, dataset] of input.datasets.entries()) {
    const base = sanitizeFileBase(dataset.name, `dataset-${index + 1}`);
    let fileName = `${base}.tsv`;
    let suffix = 2;
    while (usedNames.has(fileName)) {
      fileName = `${base}-${suffix}.tsv`;
      suffix += 1;
    }
    usedNames.add(fileName);

    const datasetPath = `datasets/${fileName}`;
    entries.push({
      name: datasetPath,
      data: textEncoder.encode(createDatasetTsv(dataset)),
    });
    manifestDatasets.push({
      id: dataset.id,
      name: dataset.name,
      file: datasetPath,
    });
  }

  const manifest: ZipManifest = {
    format: "jowna.datasets.zip",
    exportedAt: input.exportedAt,
    project: {
      id: input.project.id,
      name: input.project.name,
    },
    datasets: manifestDatasets,
  };

  entries.unshift({
    name: "manifest.json",
    data: textEncoder.encode(JSON.stringify(manifest, null, 2)),
  });

  return entries;
}

function createDatasetTsv(dataset: Dataset): string {
  const lines: string[] = [TSV_HEADER.join("\t")];
  const rows = dataset.flatTable ?? [];

  for (const row of rows) {
    const cells = [
      String(row.sourceRow),
      String(row.magnitude),
      row.path.join(" / "),
      row.url ?? "",
      row.description ?? "",
      Object.keys(row.attributes).length > 0 ? JSON.stringify(row.attributes) : "",
    ];
    lines.push(cells.map(escapeTsvCell).join("\t"));
  }

  return `${lines.join("\n")}\n`;
}

function escapeTsvCell(value: string): string {
  return value.replace(/[\t\r\n]+/g, " ");
}

function sanitizeFileBase(value: string, fallback: string): string {
  const normalized = value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized.length > 0 ? normalized : fallback;
}

function buildStoredZip(entries: ZipEntry[]): Uint8Array {
  const now = new Date();
  const { dosDate, dosTime } = encodeDosDateTime(now);

  const localChunks: Uint8Array[] = [];
  const centralChunks: Uint8Array[] = [];
  let localOffset = 0;

  for (const entry of entries) {
    const fileNameBytes = textEncoder.encode(entry.name);
    const data = entry.data;
    const crc = crc32(data);

    const localHeader = new Uint8Array(30 + fileNameBytes.length);
    const localView = new DataView(localHeader.buffer);
    writeUint32(localView, 0, 0x04034b50);
    writeUint16(localView, 4, 20);
    writeUint16(localView, 6, 0);
    writeUint16(localView, 8, 0);
    writeUint16(localView, 10, dosTime);
    writeUint16(localView, 12, dosDate);
    writeUint32(localView, 14, crc);
    writeUint32(localView, 18, data.length);
    writeUint32(localView, 22, data.length);
    writeUint16(localView, 26, fileNameBytes.length);
    writeUint16(localView, 28, 0);
    localHeader.set(fileNameBytes, 30);

    localChunks.push(localHeader, data);

    const centralHeader = new Uint8Array(46 + fileNameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20);
    writeUint16(centralView, 6, 20);
    writeUint16(centralView, 8, 0);
    writeUint16(centralView, 10, 0);
    writeUint16(centralView, 12, dosTime);
    writeUint16(centralView, 14, dosDate);
    writeUint32(centralView, 16, crc);
    writeUint32(centralView, 20, data.length);
    writeUint32(centralView, 24, data.length);
    writeUint16(centralView, 28, fileNameBytes.length);
    writeUint16(centralView, 30, 0);
    writeUint16(centralView, 32, 0);
    writeUint16(centralView, 34, 0);
    writeUint16(centralView, 36, 0);
    writeUint32(centralView, 38, 0);
    writeUint32(centralView, 42, localOffset);
    centralHeader.set(fileNameBytes, 46);
    centralChunks.push(centralHeader);

    localOffset += localHeader.length + data.length;
  }

  const centralOffset = localOffset;
  const centralSize = byteLengthOf(centralChunks);
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  writeUint32(endView, 0, 0x06054b50);
  writeUint16(endView, 4, 0);
  writeUint16(endView, 6, 0);
  writeUint16(endView, 8, entries.length);
  writeUint16(endView, 10, entries.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, centralOffset);
  writeUint16(endView, 20, 0);

  return concatUint8Arrays([...localChunks, ...centralChunks, endRecord]);
}

function encodeDosDateTime(date: Date): { dosDate: number; dosTime: number } {
  const year = Math.min(2107, Math.max(1980, date.getFullYear()));
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);
  return {
    dosDate: ((year - 1980) << 9) | (month << 5) | day,
    dosTime: (hours << 11) | (minutes << 5) | seconds,
  };
}

function writeUint16(view: DataView, offset: number, value: number): void {
  view.setUint16(offset, value & 0xffff, true);
}

function writeUint32(view: DataView, offset: number, value: number): void {
  view.setUint32(offset, value >>> 0, true);
}

function byteLengthOf(chunks: Uint8Array[]): number {
  let total = 0;
  for (const chunk of chunks) {
    total += chunk.length;
  }
  return total;
}

function concatUint8Arrays(chunks: Uint8Array[]): Uint8Array {
  const totalLength = byteLengthOf(chunks);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of data) {
    const index = (crc ^ byte) & 0xff;
    crc = (crc >>> 8) ^ crcTable[index]!;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildCrc32Table(): Uint32Array {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) !== 0 ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
    }
    table[index] = value >>> 0;
  }
  return table;
}
