import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI-Mognadsmätaren | Critero",
  description: "Mät er organisations AI-mognad med 32 påståenden inom 8 strategiska dimensioner. Få AI-genererade insikter och rekommendationer anpassade till EU AI Act.",
  keywords: ["AI-mognad", "AI maturity", "AI-strategi", "EU AI Act", "AI-bedömning", "Critero"],
  authors: [{ name: "Critero AB" }],
  openGraph: {
    title: "AI-Mognadsmätaren | Critero",
    description: "Mät er organisations AI-mognad med 32 påståenden inom 8 strategiska dimensioner",
    type: "website",
    siteName: "AI-Mognadsmätaren",
    locale: "sv_SE",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Mognadsmätaren | Critero",
    description: "Mät er organisations AI-mognad med 32 påståenden inom 8 strategiska dimensioner",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
