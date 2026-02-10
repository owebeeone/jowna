export function isUnclassifiedNodeName(name: string): boolean {
  return name.trim().toLowerCase().startsWith("[other ");
}
