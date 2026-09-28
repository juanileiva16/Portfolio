import type { Metadata, Viewport } from "next";
import { Source_Code_Pro, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { site } from "@/content";
import "./globals.css";

// next/font descarga las fuentes en build y las sirve desde el mismo dominio:
// sin requests a Google en runtime y sin salto de layout.
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const mono = Source_Code_Pro({ subsets: ["latin"], variable: "--font-source-code", display: "swap" });

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(productionHost ? `https://${productionHost}` : "http://localhost:3000"),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1C1B19" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0C0B" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
