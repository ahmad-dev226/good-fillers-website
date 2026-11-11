import type { Metadata } from "next";
import SiteShell from "@/components/site-shell";
import "./globals.css";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const metadataBase = configuredSiteUrl
  ? new URL(
      configuredSiteUrl.includes("://")
        ? configuredSiteUrl
        : `https://${configuredSiteUrl}`,
    )
  : undefined;

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: "GOOD FILLERS | Filled With Goodness",
  description:
    "Discover the delicious world of Good Fillers in Sialkot. Explore our burgers, pizzas, wraps, wings and more.",
  openGraph: {
    title: "GOOD FILLERS | Filled With Goodness",
    description:
      "Discover the delicious world of Good Fillers in Sialkot. Explore our burgers, pizzas, wraps, wings and more.",
    images: [{ url: "/images/goodfillers2.jpeg", width: 1024, height: 1280, alt: "The Saucy Situation by Good Fillers" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/goodfillers2.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
