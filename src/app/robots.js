import { profile } from "@/data/profile";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${profile.url}/sitemap.xml`,
    host: "vldm.is-a.dev",
  };
}
