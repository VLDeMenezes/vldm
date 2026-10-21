import Image from "next/image";

/**
 * Static poster of the former Lottie intro. The animation was 600 KB of JSON
 * plus a third-party player and became the mobile LCP bottleneck; this final
 * frame keeps the same artwork at roughly 15 KB and paints immediately.
 */
export default function HeroVisual() {
  return (
    <>
      <Image
        src="/profile.webp"
        alt=""
        width={200}
        height={200}
        priority
        sizes="(min-width: 500px) 25vw, 72vw"
        className="mx-auto h-auto max-w-2xl rounded-xl"
      />
      <div className="h-2 w-full rounded-t-xl bg-Detail" />
    </>
  );
}
