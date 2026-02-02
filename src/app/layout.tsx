import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mognadsmätaren | Digital Maturity Assessment",
  description: "Mät er ledningsgrupps digitala mognad med 22 påståenden inom 4 strategiska dimensioner. Få AI-genererade insikter och rekommendationer.",
  keywords: ["digital mognad", "ledningsgrupp", "digitalisering", "självskattning", "digital maturity"],
  authors: [{ name: "Mognadsmätaren" }],
  openGraph: {
    title: "Mognadsmätaren | Digital Maturity Assessment",
    description: "Mät er ledningsgrupps digitala mognad",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
