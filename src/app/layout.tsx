import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://livasporkulubu.com"),
  title: "Liva Spor Kulübü | Cimnastik & Taekwondo - Başakşehir",
  description:
    "Liva Spor Kulübü - Başakşehir'de profesyonel cimnastik ve taekwondo eğitimi. Milli sporcu antrenörlerle geleceğin şampiyonlarını yetiştiriyoruz.",
  keywords: [
    "cimnastik",
    "taekwondo",
    "spor kulübü",
    "başakşehir",
    "liva spor",
    "çocuk spor",
  ],
  openGraph: {
    title: "Liva Spor Kulübü | Cimnastik & Taekwondo",
    description:
      "Başakşehir'de profesyonel cimnastik ve taekwondo eğitimi.",
    url: "https://livasporkulubu.com",
    siteName: "Liva Spor Kulübü",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Liva Spor Kulübü - Cimnastik & Taekwondo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liva Spor Kulübü | Cimnastik & Taekwondo",
    description:
      "Başakşehir'de profesyonel cimnastik ve taekwondo eğitimi.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://livasporkulubu.com",
  },
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Liva Spor Kulübü",
  url: "https://livasporkulubu.com",
  telephone: "+905416445376",
  email: "ist.livasporkulubu@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Şahintepe, Muratdere Cd.",
    addressLocality: "Başakşehir",
    addressRegion: "İstanbul",
    postalCode: "34494",
    addressCountry: "TR",
  },
  description:
    "Başakşehir'de profesyonel cimnastik ve taekwondo eğitimi veren spor kulübü.",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Cimnastik",
        description: "Profesyonel cimnastik eğitimi",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Taekwondo",
        description: "Profesyonel taekwondo eğitimi",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
