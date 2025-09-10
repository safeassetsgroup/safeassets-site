"use client";

import { ReactNode, useEffect, useState } from "react";

// Define a specific type for the props
type MediaBackgroundProps = {
  folder: string;
  children: ReactNode;
  height?: string;
  padBottomClass?: string;
  className?: string;
};

export default function MediaBackground({
  folder,
  children,
  height = "h-auto",
  padBottomClass = "pb-0",
  className = "",
}: MediaBackgroundProps) {
  const [assets, setAssets] = useState<{ images: string[]; videos: string[] }>({
    images: [],
    videos: [],
  });
  const [videoErrored, setVideoErrored] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`/api/media-assets?dir=${encodeURIComponent(folder)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("fetch failed");

        // FIX: The API returns arrays named 'images' and 'videos'.
        // This now correctly handles that data structure.
        const data = (await res.json()) as { images: string[]; videos: string[] };
        if (!mounted) return;

        // Set the state directly with the arrays from the API response.
        setAssets({
          videos: data.videos || [],
          images: data.images || [],
        });
        setVideoErrored(false);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        if (!mounted) return;
        setAssets({ images: [], videos: [] });
        setVideoErrored(true);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [folder]);

  const showVideo = (assets.videos || []).length > 0 && !videoErrored;
  const showImage = !showVideo && (assets.images || []).length > 0;

  const handleVideoError = () => {
    console.warn("Video failed to load, falling back to image.");
    setVideoErrored(true);
  };

  return (
    <section className={`relative w-full ${height} overflow-hidden bg-gray-900 text-white ${className}`}>
      {showVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={assets.images[0] ?? undefined}
          onError={handleVideoError}
        >
          <source src={assets.videos[0] ?? ""} type="video/mp4" />
        </video>
      )}

      {!showVideo && showImage && (
        <img src={assets.images[0] ?? ""} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {!showVideo && !showImage && <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-20 w-full h-full flex items-center">
        <div className={`max-w-3xl px-8 lg:px-16 ${padBottomClass}`}>{children}</div>
      </div>
    </section>
  );
}