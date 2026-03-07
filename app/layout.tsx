import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nöbetçi Eczane - Türkiye Geneli",
  description: "Türkiye geneli en güncel nöbetçi eczane listesi. İl ve ilçe bazlı nöbetçi eczane sorgulama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen bg-slate-50/50 flex flex-col text-slate-900 antialiased`}>
        <Header />
        <main className="flex-1 w-full container mx-auto px-4 py-6 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

