import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://deidivinoffm.github.io/DeidiVino/";
const socialImageUrl = `${siteUrl}mixed-wines-retina.webp`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DeidiVino | Deutsche Weine & persönliche Weinberatung",
  description:
    "Entdecke persönlich ausgewählte deutsche Weine und individuelle Weinberatung von Sommelier Dieter Grün in Schöneck – unkompliziert merken und anfragen.",
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
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: `${siteUrl}favicon.svg`,
    shortcut: `${siteUrl}favicon.svg`,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "DeidiVino",
    title: "DeidiVino | Deutsche Weine & persönliche Weinberatung",
    description:
      "Persönlich ausgewählte deutsche Weine und individuelle Weinberatung von Sommelier Dieter Grün.",
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
    title: "DeidiVino | Deutsche Weine & persönliche Weinberatung",
    description:
      "Persönlich ausgewählte deutsche Weine und individuelle Weinberatung von Sommelier Dieter Grün.",
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeidiVino",
    url: siteUrl,
    logo: `${siteUrl}deidivino-logo.png`,
    description: "Persönlich ausgewählte deutsche Weine und individuelle Weinberatung von Sommelier Dieter Grün.",
    email: "mailto:deidivino.ffm@gmail.com",
    telephone: "+49 173 300 5720",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marie-von-Oriola-Straße 24",
      postalCode: "61137",
      addressLocality: "Schöneck",
      addressCountry: "DE",
    },
    sameAs: ["https://www.instagram.com/deidivino/"],
  };

  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        {children}
      </body>
    </html>
  );
}
