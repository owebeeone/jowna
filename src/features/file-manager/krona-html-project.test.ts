import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { materializeParsedKronaHtmlProject, parseKronaHtmlProject } from "./krona-html-project";

const SIMPLE_KRONA_HTML = `
<!doctype html>
<html>
  <body>
    <div style="display:none">
      <krona>
        <attributes magnitude="count"></attributes>
        <datasets>
          <dataset>Alpha</dataset>
          <dataset>Beta</dataset>
        </datasets>
        <node name="Root">
          <count><val>10</val><val>20</val></count>
          <node name="Left">
            <count><val>4</val><val>8</val></count>
          </node>
          <node name="Right">
            <count><val>6</val><val>12</val></count>
          </node>
        </node>
      </krona>
    </div>
  </body>
</html>
`;

describe("krona html project import", () => {
  it("parses one project with multiple datasets from krona html", () => {
    const parsed = parseKronaHtmlProject({
      name: "example.krona.html",
      content: SIMPLE_KRONA_HTML,
    });

    expect(parsed.projectName).toBe("example");
    expect(parsed.datasets).toHaveLength(2);
    expect(parsed.datasets[0]?.name).toBe("Alpha");
    expect(parsed.datasets[1]?.name).toBe("Beta");
    expect(parsed.datasets[0]?.tree.name).toBe("Root");
    expect(parsed.datasets[0]?.tree.magnitude).toBe(10);
    expect(parsed.datasets[1]?.tree.magnitude).toBe(20);
    expect(parsed.datasets[0]?.flatTable.map((row) => row.path.join("/"))).toEqual([
      "Root/Left",
      "Root/Right",
    ]);
    expect(parsed.warnings).toHaveLength(0);
  });

  it("reports warnings and continues when magnitudes are invalid", () => {
    const parsed = parseKronaHtmlProject({
      name: "invalid-values.krona.html",
      content: `
        <krona>
          <attributes magnitude="count"></attributes>
          <datasets><dataset>Set A</dataset></datasets>
          <node name="Root">
            <count><val>not-a-number</val></count>
            <node name="Child"><count><val>5</val></count></node>
          </node>
        </krona>
      `,
    });

    expect(parsed.datasets).toHaveLength(1);
    expect(parsed.datasets[0]?.tree.magnitude).toBe(5);
    expect(parsed.warnings.some((warning) => warning.code === "KRONA_INVALID_MAGNITUDE")).toBe(
      true,
    );
  });

  it("treats empty dataset magnitude values as missing without invalid warnings", () => {
    const parsed = parseKronaHtmlProject({
      name: "empty-values.krona.html",
      content: `
        <krona>
          <attributes magnitude="count"></attributes>
          <datasets><dataset>Set A</dataset></datasets>
          <node name="Root">
            <count><val></val></count>
            <node name="Child"><count><val>5</val></count></node>
          </node>
        </krona>
      `,
    });

    expect(parsed.datasets).toHaveLength(1);
    expect(parsed.datasets[0]?.tree.magnitude).toBe(5);
    expect(parsed.warnings.some((warning) => warning.code === "KRONA_INVALID_MAGNITUDE")).toBe(
      false,
    );
  });

  it("parses the population_demographics krona html fixture", () => {
    const fixturePath = fileURLToPath(
      new URL("../../../../../population_demographics.krona.html", import.meta.url),
    );
    const content = readFileSync(fixturePath, "utf8");

    const parsed = parseKronaHtmlProject({
      name: "population_demographics.krona.html",
      content,
    });

    expect(parsed.datasets.length).toBeGreaterThan(0);
    expect(parsed.datasets[0]?.tree.magnitude).toBeGreaterThan(0);
    expect(parsed.datasets[0]?.flatTable.length).toBeGreaterThan(0);
  });

  it("parses all Kronagh example html files without empty-magnitude invalid warnings", () => {
    const examplesDirPath = fileURLToPath(
      new URL("../../../../../../Kronagh/examples", import.meta.url),
    );
    const htmlFiles = readdirSync(examplesDirPath).filter((name) => name.endsWith(".html"));

    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const fileName of htmlFiles) {
      const content = readFileSync(`${examplesDirPath}/${fileName}`, "utf8");
      const parsed = parseKronaHtmlProject({
        name: fileName,
        content,
      });

      expect(parsed.datasets.length).toBeGreaterThan(0);
      const hasEmptyInvalidMagnitudeWarning = parsed.warnings.some(
        (warning) =>
          warning.code === "KRONA_INVALID_MAGNITUDE" &&
          warning.message.includes("Invalid magnitude ''"),
      );
      expect(hasEmptyInvalidMagnitudeWarning).toBe(false);
    }
  });

  it("materializes parsed krona data into project + datasets with remapped ids", () => {
    const parsed = parseKronaHtmlProject({
      name: "example.krona.html",
      content: SIMPLE_KRONA_HTML,
    });

    let nextProject = 0;
    let nextDataset = 0;
    const materialized = materializeParsedKronaHtmlProject({
      parsed,
      nowIso: "2026-02-10T00:00:00.000Z",
      createId: (prefix) => {
        if (prefix === "project") {
          nextProject += 1;
          return `project-${nextProject}`;
        }
        nextDataset += 1;
        return `dataset-${nextDataset}`;
      },
    });

    expect(materialized.project.id).toBe("project-1");
    expect(materialized.project.datasetIds).toEqual(["dataset-1", "dataset-2"]);
    expect(materialized.project.activeDatasetId).toBe("dataset-1");
    expect(materialized.datasets.map((dataset) => dataset.projectId)).toEqual([
      "project-1",
      "project-1",
    ]);
    expect(materialized.warnings).toHaveLength(0);
  });
});
