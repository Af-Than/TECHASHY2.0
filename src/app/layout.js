import { Cinzel, Cormorant_Garamond, Noto_Serif_JP, Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://tekashi.betalabs.tech"),
  title: "TEKASHI 2.0 - Premier Technology Hackathon | Forged in 24 Hours",
  description: "Join TEKASHI 2.0, a premier East-Asian inspired technology hackathon powered by Betalabs at IIIT Kottayam. 24 hours of relentless innovation, ₹80,808+ prize pool.",
  keywords: ["TEKASHI 2.0", "Tekashi Hackathon", "Betalabs", "IIIT Kottayam", "Hackathon", "Coding Competition", "Innovation", "Technology"],
  authors: [{ name: "Betalabs" }],
  creator: "Betalabs",
  publisher: "Betalabs",
  icons: {
    icon: "/Techashi_Logo-removebg-preview.png",
    shortcut: "/Techashi_Logo-removebg-preview.png",
    apple: "/Techashi_Logo-removebg-preview.png",
  },
  openGraph: {
    title: "TEKASHI 2.0 - Premier Technology Hackathon",
    description: "Join TEKASHI 2.0, a premier technology hackathon powered by Betalabs. 24 hours of relentless innovation, ₹80,808 in prizes.",
    siteName: 'TEKASHI 2.0',
    locale: 'en_US',
    type: 'website',
    images: [{ url: "/pictures/hero-mountains.jpg", width: 1200, height: 630, alt: "TEKASHI 2.0 Hackathon" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TEKASHI 2.0 - Premier Technology Hackathon",
    description: "Join TEKASHI 2.0 powered by Betalabs. Connect with innovators, build groundbreaking projects in 24 hours.",
    images: ["/pictures/hero-mountains.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${notoSerifJP.variable} ${bebasNeue.variable} ${montserrat.variable} antialiased bg-[#080404] text-[#EFE1BD]`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
