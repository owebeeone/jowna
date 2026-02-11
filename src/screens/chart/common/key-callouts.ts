export interface KeyCalloutInputEntry {
  key: string;
  name: string;
  magnitude: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  interactionPath: string[];
}

export interface KeyCalloutLayoutInput {
  entries: KeyCalloutInputEntry[];
  totalMagnitude: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
  fontSizePx: number;
}

export interface KeyCalloutRenderEntry {
  key: string;
  interactionPath: string[];
  fill: string;
  text: string;
  linePath: string;
  lineStrokeWidth: number;
  colorBoxX: number;
  colorBoxY: number;
  colorBoxSize: number;
  textX: number;
  textY: number;
  textAnchor: "end";
  textBoxX: number;
  textBoxY: number;
  textBoxWidth: number;
  textBoxHeight: number;
}

const BUFFER_FACTOR = 0.1;
const MARGIN_FACTOR = 0.015;
const MAX_KEY_SIZE_FACTOR = 2;
const THIN_LINE_WIDTH = 0.3;

export function createKeyCallouts(input: KeyCalloutLayoutInput): KeyCalloutRenderEntry[] {
  if (input.entries.length === 0 || input.totalMagnitude <= 0 || input.radius <= 0) {
    return [];
  }

  const keys = input.entries.length;
  const minDimension = input.radius / (0.5 - BUFFER_FACTOR);
  const buffer = minDimension * BUFFER_FACTOR;
  const margin = minDimension * MARGIN_FACTOR;
  let keySize = (((input.height - margin * 3) * 0.5) / keys) * 0.75;
  const maxKeySize = input.fontSizePx * MAX_KEY_SIZE_FACTOR;
  if (keySize > maxKeySize) {
    keySize = maxKeySize;
  }
  const keyBuffer = keySize / 3;

  let currentKey = 1;
  let keyMinTextLeft =
    input.centerX + input.radius + buffer - buffer / (keys + 1) / 2 + input.fontSizePx / 2;
  let keyMinAngle = 0;

  const callouts: KeyCalloutRenderEntry[] = [];
  for (const entry of input.entries) {
    const offset =
      input.height - (keys - currentKey + 1) * (keySize + keyBuffer) + keyBuffer - margin;
    const boxLeft = input.width - keySize - margin;
    const textY = offset + keySize / 2;

    const percentage = formatKronaPercentage((entry.magnitude / input.totalMagnitude) * 100);
    const label = `${entry.name}   ${percentage}%`;
    const keyNameWidth = measureText(label, input.fontSizePx);
    const textLeft = boxLeft - keyBuffer - keyNameWidth - input.fontSizePx / 2;
    let labelLeft = textLeft;

    if (labelLeft > keyMinTextLeft - input.fontSizePx / 2) {
      keyMinTextLeft -= input.fontSizePx / 2;
      const minAllowedLeft = input.centerX - input.radius + input.fontSizePx / 2;
      if (keyMinTextLeft < minAllowedLeft) {
        keyMinTextLeft = minAllowedLeft;
      }
      labelLeft = keyMinTextLeft;
    }

    const lineX: number[] = [];
    const lineY: number[] = [];
    const rawAngle = normalizeRadians((entry.startAngle + entry.endAngle) / 2 + Math.PI / 2);
    let angle = rawAngle;

    let keyAngle = Math.atan((textY - input.centerY) / (labelLeft - input.centerX));
    if (keyAngle < 0) {
      keyAngle += Math.PI;
    }

    if (keyMinAngle === 0 || angle < keyMinAngle) {
      keyMinAngle = angle;
    }

    if (angle > Math.PI && keyMinAngle > Math.PI) {
      angle -= Math.PI * 2;
    }

    lineX.push(Math.cos(angle) * input.radius);
    lineY.push(Math.sin(angle) * input.radius);

    const bendRadius =
      angle < keyAngle &&
      textY >
        input.centerY +
          Math.sin(angle) *
            (input.radius + (buffer * (currentKey - 1)) / (keys + 1) / 2 + buffer / 2)
        ? input.radius + buffer - (buffer * currentKey) / (keys + 1) / 2
        : input.radius + (buffer * currentKey) / (keys + 1) / 2 + buffer / 2;

    const outside =
      Math.sqrt(Math.pow(labelLeft - input.centerX, 2) + Math.pow(textY - input.centerY, 2)) >
      bendRadius;

    let arcAngle = angle;
    if (!outside) {
      arcAngle = Math.asin((textY - input.centerY) / bendRadius);
      keyMinTextLeft = Math.min(
        keyMinTextLeft,
        input.centerX + bendRadius * Math.cos(arcAngle) - input.fontSizePx / 2,
      );

      if (labelLeft < textLeft && textLeft > input.centerX + bendRadius * Math.cos(arcAngle)) {
        lineX.push(textLeft - input.centerX);
        lineY.push(textY - input.centerY);
      }
    } else {
      keyMinTextLeft = Math.min(keyMinTextLeft, labelLeft - input.fontSizePx / 2);
      if (angle < keyAngle) {
        arcAngle =
          Math.PI / 2 -
          keyLineAngle(
            Math.PI / 2 - angle,
            Math.PI / 2 - keyAngle,
            bendRadius,
            textY - input.centerY,
            labelLeft - input.centerX,
            lineY,
            lineX,
          );
      } else {
        arcAngle = keyLineAngle(
          angle,
          keyAngle,
          bendRadius,
          labelLeft - input.centerX,
          textY - input.centerY,
          lineX,
          lineY,
        );
      }
    }

    if (
      labelLeft > input.centerX + bendRadius * Math.cos(arcAngle) ||
      textY > input.centerY + bendRadius * Math.sin(arcAngle) + 0.01
    ) {
      lineX.push(labelLeft - input.centerX);
      lineY.push(textY - input.centerY);

      if (textLeft !== labelLeft) {
        lineX.push(textLeft - input.centerX);
        lineY.push(textY - input.centerY);
      }
    }

    const linePath = buildKeyLinePath(
      lineX,
      lineY,
      input.centerX,
      input.centerY,
      bendRadius,
      angle,
      arcAngle,
    );

    callouts.push({
      key: entry.key,
      interactionPath: entry.interactionPath,
      fill: entry.fill,
      text: label,
      linePath,
      lineStrokeWidth: (THIN_LINE_WIDTH * input.fontSizePx) / 12,
      colorBoxX: boxLeft,
      colorBoxY: offset,
      colorBoxSize: keySize,
      textX: boxLeft - keyBuffer,
      textY,
      textAnchor: "end",
      textBoxX: boxLeft - keyBuffer - keyNameWidth - input.fontSizePx / 2,
      textBoxY: textY - input.fontSizePx,
      textBoxWidth: keyNameWidth + input.fontSizePx,
      textBoxHeight: input.fontSizePx * 2,
    });

    currentKey += 1;
  }

  return callouts;
}

function buildKeyLinePath(
  lineX: number[],
  lineY: number[],
  centerX: number,
  centerY: number,
  bendRadius: number,
  angle: number,
  arcAngle: number,
): string {
  if (lineX.length === 0 || lineY.length === 0) {
    return "";
  }

  const path: string[] = [`M ${lineX[0]! + centerX} ${lineY[0]! + centerY}`];

  if (angle !== arcAngle) {
    path.push(
      `L ${centerX + bendRadius * Math.cos(angle)} ${centerY + bendRadius * Math.sin(angle)}`,
    );
    path.push(
      `A ${bendRadius} ${bendRadius} 0 0 ${angle > arcAngle ? 0 : 1} ${centerX + bendRadius * Math.cos(arcAngle)} ${centerY + bendRadius * Math.sin(arcAngle)}`,
    );
  }

  for (let index = 1; index < Math.min(lineX.length, lineY.length); index += 1) {
    path.push(`L ${centerX + lineX[index]!} ${centerY + lineY[index]!}`);
  }

  return path.join(" ");
}

function keyLineAngle(
  angle: number,
  keyAngle: number,
  bendRadius: number,
  keyX: number,
  keyY: number,
  pointsX: number[],
  pointsY: number[],
): number {
  if (
    (angle < Math.PI / 2 && keyY < bendRadius * Math.sin(angle)) ||
    (angle > Math.PI / 2 && keyY < bendRadius)
  ) {
    return Math.asin(keyY / bendRadius);
  }

  const textDist = Math.sqrt(Math.pow(keyX, 2) + Math.pow(keyY, 2));
  const tanAngle = Math.acos(bendRadius / textDist) + keyAngle;

  if (angle < tanAngle || angle < Math.PI / 2) {
    const tangentX = keyY / Math.tan(angle);
    if (tangentX > 0) {
      pointsX.push(tangentX);
      pointsY.push(keyY);
    } else {
      pointsX.push(bendRadius * Math.cos(angle));
      pointsY.push(bendRadius * Math.sin(angle));
    }
    return angle;
  }

  return tanAngle;
}

function formatKronaPercentage(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }
  if (value >= 1 || value <= -1) {
    return value.toFixed(0);
  }
  return Number(value.toPrecision(1)).toString();
}

function measureText(text: string, fontSizePx: number): number {
  return text.length * fontSizePx * 0.58;
}

function normalizeRadians(angle: number): number {
  let normalized = angle;
  while (normalized < 0) {
    normalized += Math.PI * 2;
  }
  while (normalized >= Math.PI * 2) {
    normalized -= Math.PI * 2;
  }
  return normalized;
}
