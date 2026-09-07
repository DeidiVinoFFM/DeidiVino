import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://deidivinoffm.github.io/DeidiVino/";
const socialImageUrl = `${siteUrl}mixed-wines-retina.webp`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DeidiVino Weinliste | Persönlich ausgewählte Weine",
  description:
    "Entdecke persönlich ausgewählte Weine deutscher Weingüter – mit ehrlicher Empfehlung von Dieter Grün und unkomplizierter Anfrage.",
  keywords: [
    "DeidiVino",
    "Weinliste",
    "Weinberatung",
    "deutsche Weine",
    "Riesling",
    "Spätburgunder",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "DeidiVino",
    title: "DeidiVino | Persönlich ausgewählte Weine",
    description:
      "Charaktervolle Weine deutscher Weingüter – persönlich ausgewählt und unkompliziert angefragt.",
    images: [
      {
        url: socialImageUrl,
        width: 1264,
        height: 944,
        alt: "Persönlich ausgewählte Weinflaschen von DeidiVino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeidiVino | Persönlich ausgewählte Weine",
    description:
      "Charaktervolle Weine deutscher Weingüter – persönlich ausgewählt und unkompliziert angefragt.",
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
