export function formatKronaRounded(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  if (value >= 1 || value <= -1) {
    return value.toFixed(0);
  }

  return value.toPrecision(1);
}

export function formatKronaPercentageFromFraction(fraction: number): string {
  return formatKronaRounded(fraction * 100);
}

export function formatKronaPercentageValue(value: number): string {
  return formatKronaRounded(value);
}

export function formatKronaKeyLabel(
  name: string,
  magnitude: number,
  totalMagnitude: number,
): string {
  const percentage =
    totalMagnitude > 0 ? formatKronaPercentageValue((magnitude / totalMagnitude) * 100) : "0";
  return `${name}   ${percentage}%`;
}

export function formatKronaUnclassifiedText(name: string): string {
  return `[other ${name}]`;
}

export function toKronaDisplayName(name: string): string {
  const normalized = name.trim().toLowerCase();
  if (normalized.startsWith("[other ")) {
    return name;
  }
  if (normalized.startsWith("other ")) {
    return `[${name}]`;
  }
  return name;
}

export function ellipsizeKronaLabel(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  const endLength = Math.floor((maxLength - 1) / 2);
  if (endLength <= 0) {
    return "...";
  }

  return `${value.substring(0, endLength)}...${value.substring(value.length - endLength)}`;
}
