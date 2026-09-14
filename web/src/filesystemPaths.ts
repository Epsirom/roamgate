export function parentFilesystemPath(value: string): string {
  const path = value.replace(/\\/g, "/");
  const prefix = path.match(/^(?:[a-z]:\/|\/\/[^/]+\/[^/]+\/?|\/)/i)?.[0];
  if (!prefix) return path;
  const root = prefix.startsWith("//") ? prefix.replace(/\/$/, "") : prefix;
  const trimmed = path.replace(/\/+$/, "");
  if (trimmed.length <= root.length) return root;
  const slash = trimmed.lastIndexOf("/");
  return slash < root.length ? root : trimmed.slice(0, slash);
}

export function normalizeFilesystemPath(value: string): string {
  const path = value.replace(/\\/g, "/").replace(/\/+$/, "");
  return path || "/";
}

/** Absolute filesystem path for a directory preview, joining the preview root. */
export function directoryPreviewPath(
  preview: { type?: string; root: string; path: string } | null | undefined,
): string | null {
  if (!preview || preview.type !== "directory") return null;
  const path = /^(?:\/|[a-z]:\/)/i.test(preview.path)
    ? preview.path
    : `${preview.root.replace(/\/+$/, "")}/${preview.path}`;
  return normalizeFilesystemPath(path);
}

/** Display name for a directory preview: its last path component. */
export function directoryPreviewName(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? "";
}
