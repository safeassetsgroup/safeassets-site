import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#1E2328]/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/SafeAssetsGroup-Logo-original.png"
            alt="Safe Assets Group"
            width={160}
            height={40}
            priority
          />
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <a href="/#industries" className="text-[#B8BDC4] hover:text-white transition">Industries</a>
          <span aria-disabled="true" title="Login coming soon" className="text-[#8A9097] cursor-not-allowed select-none opacity-60">
            Login (coming soon)
          </span>
        </div>
      </div>
    </nav>
  );
}
