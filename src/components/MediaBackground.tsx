"use client";

import { ReactNode, useEffect, useState } from "react";

type Props = {
  folder?: string;
  imageUrl?: string; // optional override to use a specific image instead of fetching folder
  videoUrl?: string; // optional override to use a specific video
  children?: ReactNode;
  height?: string;
  className?: string;
  padBottomClass?: string;
};

type MediaResponse = { video: string | null; image: string | null };

export default function MediaBackground({
  folder,
  imageUrl: imageUrlProp,
  videoUrl: videoUrlProp,
  children,
  height = "h-[80vh]",
  className = "",
  padBottomClass = "pb-28",
}: Props) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoErrored, setVideoErrored] = useState(false);

  useEffect(() => {
    if (videoUrlProp) {
      setVideoUrl(videoUrlProp);
      setImageUrl(null);
      setVideoErrored(false);
      return;
    }

    if (imageUrlProp) {
      setImageUrl(imageUrlProp);
      setVideoUrl(null);
      setVideoErrored(false);
      return;
    }

    if (!folder) {
      setVideoUrl(null);
      setImageUrl(null);
      return;
    }

    const controller = new AbortController();
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`/api/media-assets?dir=${encodeURIComponent(folder)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("fetch failed");
        const data = (await res.json()) as MediaResponse;
        if (!mounted) return;
        setVideoUrl(data.video ?? null);
        setImageUrl(data.image ?? null);
        setVideoErrored(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!mounted) return;
        setVideoUrl(null);
        setImageUrl(null);
        setVideoErrored(true);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [folder, imageUrlProp, videoUrlProp]);

  const showVideo = !!videoUrl && !videoErrored;
  const showImage = !showVideo && !!imageUrl;

  const handleVideoError = () => {
    setVideoErrored(true);
    setVideoUrl(null);
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
          poster={imageUrl ?? undefined}
          onError={handleVideoError}
        >
          <source src={videoUrl ?? ""} type="video/mp4" />
        </video>
      )}

      {!showVideo && showImage && (
        <img src={imageUrl ?? ""} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {!showVideo && !showImage && <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-20 w-full h-full flex items-center">
        <div className={`max-w-3xl px-8 lg:px-16 ${padBottomClass}`}>{children}</div>
      </div>
    </section>
  );
}