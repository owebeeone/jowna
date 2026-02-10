import type { Dataset } from "../../../domain";

export interface DatasetSelectorOption {
  id: string;
  name: string;
}

export interface DatasetSelectorState {
  options: DatasetSelectorOption[];
  selectedId: string | null;
  showSelector: boolean;
}

export function createDatasetSelectorState(
  datasets: Dataset[],
  activeDatasetId: string | null,
): DatasetSelectorState {
  const options = datasets.map((dataset) => ({
    id: dataset.id,
    name: dataset.name,
  }));

  const selectedId =
    activeDatasetId && options.some((option) => option.id === activeDatasetId)
      ? activeDatasetId
      : (options[0]?.id ?? null);

  return {
    options,
    selectedId,
    showSelector: options.length > 1,
  };
}
