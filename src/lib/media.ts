export function normalizeImagePath(raw: string | undefined, folder = "/industries/") {
  if (!raw) return "/placeholder.jpg";

  // allow absolute URLs and remote URLs unchanged except force extension
  try {
    const isRemote = /^https?:\/\//i.test(raw);
    const isAbsolute = raw.startsWith("/");
    const base = isRemote ? raw : isAbsolute ? raw : folder + raw;

    // strip query/hash for extension detection
    const noQuery = base.split("?")[0].split("#")[0];
    const extMatch = noQuery.match(/\.([^.\/]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : null;

    if (ext === "jpg" || ext === "jpeg" || ext === "png") {
      return encodeURI(base);
    }

    // if extension present but not allowed, replace with .jpg
    if (ext) {
      return encodeURI(base.replace(/\.[^.\/]+$/, ".jpg"));
    }

    // no extension -> append .jpg
    return encodeURI(base + ".jpg");
  } catch {
    return "/placeholder.jpg";
  }
}

export function normalizeVideoPath(raw: string | undefined, folder = "/hero/") {
  if (!raw) return null;
  try {
    const isRemote = /^https?:\/\//i.test(raw);
    const isAbsolute = raw.startsWith("/");
    const base = isRemote ? raw : isAbsolute ? raw : folder + raw;

    const noQuery = base.split("?")[0].split("#")[0];
    const extMatch = noQuery.match(/\.([^.\/]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : null;

    if (ext === "mp4") return encodeURI(base);
    if (ext) return encodeURI(base.replace(/\.[^.\/]+$/, ".mp4"));
    return encodeURI(base + ".mp4");
  } catch {
    return null;
  }
}