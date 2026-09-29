import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { profile, site } from "@/content";
import { themeInitScript } from "@/components/theme";
import { TopoSpotlight } from "@/components/TopoSpotlight";
import "./globals.css";

// next/font descarga las fuentes en build y las sirve desde el mismo dominio:
// sin requests a Google en runtime y sin salto de layout.
const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-chakra",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Base fija: las URLs de og:image y la canónica apuntan siempre al dominio
  // oficial, aunque el sitio se sirva desde una URL de preview de Vercel.
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F5F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0F0C" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: el script del <head> puede agregar data-theme a
    // <html> antes de que React hidrate, y esa diferencia es intencional.
    <html
      lang="es-AR"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <TopoSpotlight />
        {children}
      </body>
    </html>
  );
}
