export function normalizeAttributeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
}

export function isUnassignedAttributeKey(key: string): boolean {
  const normalized = normalizeAttributeKey(key);
  return /\bunassigned\b/.test(normalized);
}

export function isUnassignedMembersKey(key: string): boolean {
  const normalized = normalizeAttributeKey(key);
  return /\bunassigned\b/.test(normalized) && /\bmembers?\b/.test(normalized);
}

export function isMembersListKey(key: string, value: string): boolean {
  const normalized = normalizeAttributeKey(key);
  if (!/\bmembers?\b/.test(normalized)) {
    return false;
  }
  return value.trim().length > 0;
}

export function resolveMembersAttributeKey(attributes: Array<[string, string]>): string | null {
  const explicitUnassigned = attributes.find(([key]) => isUnassignedMembersKey(key));
  if (explicitUnassigned) {
    return explicitUnassigned[0];
  }

  const membersField = attributes.find(([key, value]) => isMembersListKey(key, value));
  return membersField?.[0] ?? null;
}

export function parseMemberNames(rawValue: string, keyHint?: string): string[] {
  const trimmed = rawValue.trim();
  if (trimmed.length === 0) {
    return [];
  }

  if (
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith("{") && trimmed.endsWith("}"))
  ) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return Array.from(
          new Set(parsed.map((value) => String(value).trim()).filter((value) => value.length > 0)),
        );
      }
    } catch {
      // Best-effort parsing; fall back to delimiter-based parsing.
    }
  }

  const keySuggestsMembers = keyHint ? /\bmembers?\b/.test(normalizeAttributeKey(keyHint)) : false;
  if (keySuggestsMembers && !/[,\n;|]/.test(trimmed)) {
    const whitespaceTokens = trimmed.split(/\s+/).filter((value) => value.length > 0);
    if (
      whitespaceTokens.length > 1 &&
      whitespaceTokens.every((value) => /^[\w./:-]+$/.test(value))
    ) {
      return Array.from(new Set(whitespaceTokens));
    }
  }

  const separator = trimmed.includes("\n")
    ? /\r?\n+/
    : trimmed.includes(";")
      ? /\s*;\s*/
      : trimmed.includes("|")
        ? /\s*\|\s*/
        : /\s*,\s*/;

  return Array.from(
    new Set(
      trimmed
        .split(separator)
        .map((value) => value.trim())
        .filter((value) => value.length > 0),
    ),
  );
}
