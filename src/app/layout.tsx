import type { Metadata } from 'next';
import { draftMode } from "next/headers";
import { Inter, Teachers } from 'next/font/google';
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GetNavigationQuery } from "@/queries/general/getNav";

import "@/styles/globals.scss";

import Footer from "@/components/Globals/Footer/Footer";
import Navigation from "@/components/Globals/Navigation/Navigation";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const teachers = Teachers({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-teachers', 
});

// Added SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://lightworkerranch.com'), // Replace with your actual domain
  title: {
    default: 'LightWorker Ranch',
    template: '%s | LightWorker Ranch',
  },
  description: 'Your sanctuary for wellness, community, and growth.',
  openGraph: {
    title: 'LightWorker Ranch',
    description: 'Your sanctuary for wellness, community, and growth.',
    url: 'https://lightworkerranch.com',
    siteName: 'LightWorker Ranch',
    images: [
      {
        url: '/lightworkerranch.png',
        width: 1200,
        height: 630,
        alt: 'LightWorker Ranch',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LightWorker Ranch',
    description: 'Your sanctuary for wellness, community, and growth.',
    images: ['/lightworkerranch.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();
  const isEnabled = draft.isEnabled;
  
  const navData = await fetchGraphQL(GetNavigationQuery);
  const menuItems = navData?.menu?.menuItems?.nodes || [];

  return (
    <html lang="en" className={`${inter.variable} ${teachers.variable}`}>
      <body className={teachers.className}>
        {isEnabled && <PreviewNotice />}
        <Navigation menuItems={menuItems} />
        {children}
        <Footer />
      </body>
    </html>
  );
}