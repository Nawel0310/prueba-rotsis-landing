import type { Metadata } from "next";
import { Cormorant_Garamond, Bebas_Neue, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { ProductModalProvider } from "@/components/ProductModalProvider";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://nawel0310.github.io/prueba-rotsis-landing";

export const metadata: Metadata = {
  title: {
    default: "ROTSIS — Marketplace de Tiendas Premium",
    template: "%s | ROTSIS",
  },
  description:
    "Descubrí las mejores tiendas y productos premium en un solo lugar. Moda, tecnología, diseño y más en ROTSIS.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "ROTSIS",
    title: "ROTSIS — Marketplace de Tiendas Premium",
    description:
      "Descubrí las mejores tiendas y productos premium en un solo lugar.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ROTSIS — Marketplace de Tiendas Premium",
    description:
      "Descubrí las mejores tiendas y productos premium en un solo lugar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${bebas.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll>
          <ProductModalProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </ProductModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
