import HeroBackground from "./HeroBackground";
import IndustriesScroll from "./IndustriesScroll";

export default function Hero() {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroBackground
          videoSrc="https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/hero_images/hero-video.mp4"
          imageSrc="https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/hero_images/Hero.jpg"
          alt="Background of industrial equipment"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-4 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Advanced Asset Management for Industries
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-8">
          Private, connected and verifiable systemes - designed for construction,
          agriculture, transport, energy, defence & strata.
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">Talk to us</button>
          <button className="bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full hover:bg-white/20 transition">
            Browse Industries
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <IndustriesScroll />
      </div>
    </div>
  );
}