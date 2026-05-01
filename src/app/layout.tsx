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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. MUST await draftMode in Next.js 15
  const draft = await draftMode();
  const isEnabled = draft.isEnabled;
  
  const navData = await fetchGraphQL(GetNavigationQuery);
  const menuItems = navData?.menu?.menuItems?.nodes || [];

  return (
    <html lang="en" className={`${inter.variable} ${teachers.variable}`}>
      {/* 2. Add 'teachers.className' here so the whole site uses it by default */}
      <body className={teachers.className}>
        {isEnabled && <PreviewNotice />}
        <Navigation menuItems={menuItems} />
        {children}
        <Footer />
      </body>
    </html>
  );
}