'use client';

import { useState } from 'react';

interface HeroBackgroundProps {
  videoSrc: string;
  imageSrc: string;
  alt: string;
}

export default function HeroBackground({ videoSrc, imageSrc, alt }: HeroBackgroundProps) {
  const [videoError, setVideoError] = useState(false);

  if (videoError) {
    return (
      <>
        <img
          src={imageSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
      </>
    );
  }

  return (
    <>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        poster={imageSrc}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setVideoError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0" />
    </>
  );
}
