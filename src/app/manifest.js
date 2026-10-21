import { profile } from "@/data/profile";

export default function manifest() {
  return {
    name: `${profile.fullName} — Portfolio`,
    short_name: "VLDM",
    description:
      "Full Stack Developer and Frontend Engineer building scalable web and mobile products.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#D9CCC1",
    theme_color: "#011720",
    lang: "en",
    categories: ["portfolio", "technology"],
    icons: [
      {
        src: "/icon.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
