import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/services/",
  "/services/mutual-funds/",
  "/services/insurance/",
  "/services/loans/",
  "/about/",
  "/calculators/",
  "/book/",
  "/contact/",
  "/terms/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: r === "/" ? "weekly" : "monthly",
    priority: r === "/" ? 1 : r.startsWith("/services") || r === "/book/" ? 0.8 : 0.5,
  }));
}
