import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "DeidiVino Weinliste September 2026 | Persönlich ausgewählte Weine",
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
