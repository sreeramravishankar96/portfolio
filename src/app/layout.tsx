import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProvider } from "@/lib/scroll";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter",
  display: "swap"
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ],
  variable: "--font-serif",
  display: "swap"
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sreeramravishankar96.github.io/portfolio"),
  title: "Sreeram Ravishankar — Software Engineer",
  description:
    "Production portfolio of Sreeram Ravishankar: Software Engineer specializing in Java, Spring Boot, distributed microservices, and enterprise authentication platforms.",
  openGraph: {
    title: "Sreeram Ravishankar — Software Engineer",
    description:
      "Software Engineer specializing in Java, Spring Boot, distributed microservices, and enterprise authentication platforms.",
    url: "https://sreeramravishankar96.github.io/portfolio",
    siteName: "Sreeram Ravishankar Portfolio",
    images: [
      {
        url: "/portfolio/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sreeram Ravishankar"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sreeram Ravishankar — Software Engineer",
    description:
      "Software Engineer specializing in Java, Spring Boot, distributed microservices, and enterprise authentication platforms.",
    images: ["/portfolio/og.jpg"]
  },
  icons: {
    icon: "/portfolio/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
