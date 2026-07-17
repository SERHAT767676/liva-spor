import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://livasporkulubu.com"),
  title: "Liva Spor Kulübü | Cimnastik & Taekwondo - Başakşehir Ispartakule",
  description:
    "Liva Spor Kulübü - Başakşehir Ispartakule'de profesyonel cimnastik ve taekwondo eğitimi. Milli sporcu antrenörlerle geleceğin şampiyonlarını yetiştiriyoruz. Ücretsiz deneme dersi için hemen iletişime geçin.",
  keywords: [
    "cimnastik",
    "jimnastik",
    "taekwondo",
    "tekvando",
    "spor kulübü",
    "başakşehir",
    "ispartakule",
    "ispartakule cimnastik",
    "ispartakule jimnastik",
    "başakşehir jimnastik",
    "bahçeşehir jimnastik",
    "ispartakule taekwondo",
    "ispartakule tekvando",
    "ispartakule spor kulübü",
    "bahçeşehir cimnastik",
    "şahintepe spor",
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
    : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Liva Spor Kulübü",
  url: "https://livasporkulubu.com",
  telephone: "+905416445376",
  email: "ist.livasporkulubu@gmail.com",
  image: "https://livasporkulubu.com/images/hero-bg.jpg",
  logo: "https://livasporkulubu.com/images/logo.png",
  sameAs: ["https://www.instagram.com/istanbullivasporkulubu"],
  areaServed: [
    { "@type": "Place", name: "Ispartakule" },
    { "@type": "Place", name: "Başakşehir" },
    { "@type": "Place", name: "Şahintepe" },
    { "@type": "Place", name: "Bahçeşehir" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
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
    <html lang="tr" className={`${poppins.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QEG6MQGF6G"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QEG6MQGF6G');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
