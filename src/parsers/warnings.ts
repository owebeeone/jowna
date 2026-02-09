import type { ImportWarning } from "../domain";

export interface WarningInit {
  code: string;
  message: string;
  row?: number;
  column?: string;
}

export function createWarning(init: WarningInit): ImportWarning {
  return {
    code: init.code,
    message: init.message,
    severity: "warning",
    row: init.row,
    column: init.column,
  };
}
