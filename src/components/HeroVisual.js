import Image from "next/image";

/**
 * Static poster of the former Lottie intro. The animation was 600 KB of JSON
 * plus a third-party player and became the mobile LCP bottleneck; this final
 * frame keeps the same artwork at roughly 15 KB and paints immediately.
 */
export default function HeroVisual() {
  return (
    <Image
      src="/hero-poster.webp"
      alt=""
      width={1154}
      height={580}
      priority
      sizes="(min-width: 1024px) 45vw, 92vw"
      className="mx-auto h-auto w-full max-w-2xl rounded-xl"
    />
  );
}
