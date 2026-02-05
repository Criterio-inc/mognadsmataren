import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digital mognadsmätare | Critero",
  description: "Mät er ledningsgrupps digitala mognad med 22 påståenden inom 4 strategiska dimensioner. Få AI-genererade insikter och rekommendationer.",
  keywords: ["digital mognad", "ledningsgrupp", "digitalisering", "självskattning", "digital maturity", "Critero"],
  authors: [{ name: "Critero AB" }],
  openGraph: {
    title: "Digital mognadsmätare | Critero",
    description: "Mät er ledningsgrupps digitala mognad med 22 påståenden inom 4 strategiska dimensioner",
    type: "website",
    siteName: "Digital mognadsmätare",
    locale: "sv_SE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital mognadsmätare | Critero",
    description: "Mät er ledningsgrupps digitala mognad med 22 påståenden inom 4 strategiska dimensioner",
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
