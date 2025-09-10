export function buildCandidatesForIndustry(industry: any, fallbackSlug?: string) {
  const candidates: string[] = [];
  const pushIf = (p?: string) => {
    if (!p) return;
    const encoded = encodeURI(p);
    if (!candidates.includes(encoded)) candidates.push(encoded);
  };

  const provided = industry?.image ?? industry?.media;
  if (provided) {
    const raw = String(provided).trim();
    if (/^https?:\/\//i.test(raw) || raw.startsWith("/")) {
      // if an absolute url or startsWith / use directly (and try png/jpg variants if applicable)
      if (/\.(jpe?g)$/i.test(raw)) pushIf(raw.replace(/\.(jpe?g)$/i, ".png"));
      pushIf(raw);
      if (/\.(png)$/i.test(raw)) pushIf(raw.replace(/\.png$/i, ".jpg"));
    } else {
      // relative filename -> try /industries/<raw> and common extensions
      const base = `/industries/${raw}`;
      if (/\.(jpe?g)$/i.test(raw)) pushIf(base.replace(/\.(jpe?g)$/i, ".png"));
      pushIf(base);
      if (!/\.(png|jpe?g|webp|mp4|webm)$/i.test(raw)) {
        pushIf(base + ".png");
        pushIf(base + ".jpg");
        pushIf(base + ".webp");
        pushIf(base + ".mp4");
        pushIf(base + ".webm");
      } else if (/\.(png)$/i.test(raw)) {
        pushIf(base.replace(/\.png$/i, ".jpg"));
      }
    }
  }

  if (industry?.slug) {
    pushIf(`/industries/${industry.slug}.png`);
    pushIf(`/industries/${industry.slug}.jpg`);
    pushIf(`/industries/${industry.slug}.mp4`);
    pushIf(`/industries/${industry.slug}.webm`);
  }

  if (fallbackSlug) {
    pushIf(`/industries/${fallbackSlug}.png`);
    pushIf(`/industries/${fallbackSlug}.jpg`);
    pushIf(`/industries/${fallbackSlug}.mp4`);
  }

  pushIf("/placeholder.jpg");
  return candidates;
}

export function preloadImage(src: string) {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/** probeCandidate: images via Image, videos via HEAD request */
export async function probeCandidate(url: string) {
  const lower = url.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".ogg")) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (!res.ok) return false;
      const ct = res.headers.get("content-type") ?? "";
      return ct.startsWith("video");
    } catch {
      return false;
    }
  }

  return preloadImage(url);
}

export function getMediaCandidates(assets: { images: string[]; videos: string[] }, folder: string) {
  const images = assets.images
    .filter((f) => f.startsWith(`${folder}/`))
    .map((f) => `/${f}`);
  
  const videos = assets.videos
    .filter((f) => f.startsWith(`${folder}/`))
    .map((f) => `/${f}`);

  // FIX: Return 'images' and 'videos' to match what the component expects.
  return { images, videos };
}