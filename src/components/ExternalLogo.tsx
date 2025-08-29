"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

function getDomain(input?: string): string | null {
  if (!input) return null;
  try {
    // support raw domains ("acme.com") or full URLs ("https://www.acme.com/path")
    const url = input.includes("://") ? new URL(input) : new URL(`https://${input}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    // if it's already a domain-like string, fall back to it
    return input.replace(/^https?:\/\//, "").replace(/^www\./, "") || null;
  }
}

export default function ExternalLogo({
  websiteOrDomain,
  size = 64,
  alt = "logo",
  className = "",
}: {
  websiteOrDomain?: string;
  size?: number;
  alt?: string;
  className?: string;
}) {
  const domain = useMemo(() => getDomain(websiteOrDomain), [websiteOrDomain]);
  const [src, setSrc] = useState<string | null>(() =>
    domain ? `https://logo.clearbit.com/${domain}` : null
  );

  // Secondary fallback: Google's favicon service (often has something)
  const googleSrc = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}` : null;

  if (!domain) {
    return (
      <div
        className={[
          "grid place-items-center rounded-md bg-white/60 ring-1 ring-gray-200 text-gray-500",
          className,
        ].join(" ")}
        style={{ width: size, height: size }}
      >
        <span className="text-xs">No domain</span>
      </div>
    );
  }

  return src ? (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => {
        if (src !== googleSrc) setSrc(googleSrc);
        else setSrc(null);
      }}
    />
  ) : (
    <div
      className={[
        "grid place-items-center rounded-md bg-white/60 ring-1 ring-gray-200 text-gray-400",
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      <span className="text-xs">No logo</span>
    </div>
  );
}
