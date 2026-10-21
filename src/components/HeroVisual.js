import Image from "next/image";

/**
 * Static portrait of the former Lottie intro. The animation was 600 KB of JSON
 * plus a third-party player and became the mobile LCP bottleneck; this image
 * keeps the artwork lightweight and paints immediately.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual group relative isolate mx-auto w-full max-w-md">
      <div aria-hidden="true" className="hero-visual__glow" />
      <div className="relative z-10 overflow-hidden rounded-t-xl">
        <Image
          src="/profile.webp"
          alt=""
          width={200}
          height={200}
          priority
          sizes="(min-width: 500px) 25vw, 72vw"
          className="hero-visual__image mx-auto h-auto max-w-2xl rounded-t-xl"
        />
        <span aria-hidden="true" className="hero-visual__sheen" />
      </div>
      <div className="hero-visual__bar h-2 w-full rounded-t-xl bg-Detail" />
    </div>
  );
}
