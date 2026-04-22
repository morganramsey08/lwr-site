import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import { Teachers } from 'next/font/google';

import "@/app/globals.css";

import Footer from "@/components/Globals/Footer/Footer";
import Navigation from "@/components/Globals/Navigation/Navigation";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

const inter = Inter({ subsets: ["latin"] });

// Configure the font
const teachers = Teachers({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'], // Choose the weights you need
  variable: '--font-teachers', // This creates a CSS variable we can use in SASS
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body className={inter.className}>
        {isEnabled && <PreviewNotice />}
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
