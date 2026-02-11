import { HelpPopover } from "../../../HelpPopover";
import { useChartScreenContext } from "../context";

export function ChartHelpPopover() {
  const model = useChartScreenContext();
  return <HelpPopover open={model.helpPopoverOpen} onClose={model.closeHelpPopover} />;
}
