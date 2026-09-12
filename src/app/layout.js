import { Montserrat, Noto_Sans_JP, Six_Caps, Exo_2, Iceberg, Press_Start_2P } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

// Samurai-inspired Japanese font
const notoSansJP = Noto_Sans_JP({
  variable: "--font-samurai",
  subsets: ["latin"],
  weight: ["700", "900"],
});
//
const sixCaps = Six_Caps({
  variable: "--font-six-caps",
  subsets: ["latin"],
  weight: ["400"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400"],
});
////
const iceberg = Iceberg({
  variable: "--font-iceberg",
  subsets: ["latin"],
  weight: ["400"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata = {
  title: "Techashy - Premier Technology Hackathon",
  description: "Join Techashy, a premier hackathon powered by Betalabs. Connect with innovators, build groundbreaking projects, and compete with the best minds in technology.",
  keywords: ["Techashy", "Betalabs", "Hackathon", "Coding Competition", "Innovation", "Technology"],
  authors: [{ name: "Betalabs" }],
  creator: "Betalabs",
  publisher: "Betalabs",
  icons: {
    icon: "/Techashi_Logo-removebg-preview.png",
    shortcut: "/Techashi_Logo-removebg-preview.png",
    apple: "/Techashi_Logo-removebg-preview.png",
  },
  openGraph: {
    title: "Techashy - Premier Technology Hackathon",
    description: "Join Techashy, a premier hackathon powered by Betalabs. Connect with innovators, build groundbreaking projects, and compete with the best minds in technology.",
    siteName: 'Techashy',
    locale: 'en_US',
    type: 'website',
    images: [{ url: "/Techashi_Logo-removebg-preview.png", width: 800, height: 800, alt: "Techashy Logo" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Techashy - Premier Technology Hackathon",
    description: "Join Techashy, a premier hackathon powered by Betalabs. Connect with innovators, build groundbreaking projects, and compete with the best minds in technology.",
    images: ["/Techashi_Logo-removebg-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="video" href="/Japan BG.mp4" type="video/mp4" />
      </head>
      <body
        className={`${montserrat.variable} ${notoSansJP.variable} ${sixCaps.variable} ${exo2.variable} ${iceberg.variable} ${pressStart.variable} antialiased font-bold`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
