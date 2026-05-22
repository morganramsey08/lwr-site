import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { AboutPageQuery } from "@/queries/general/getAboutPage";
import { GetNewsletterSettings } from "@/queries/general/getNewsletter"; // Added import
import Hero from "@/components/Hero/Hero";
import AboutIntroduction from "@/components/About/AboutIntroduction";
import MissionVision from "@/components/About/MissionVision";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";
import VisitSanctuary from "@/components/Sanctuary/Sanctuary";
import Newsletter from "@/components/Newsletter/Newsletter"; // Added import

export default async function AboutPage() {
  const queryStr = typeof AboutPageQuery === 'string' 
    ? AboutPageQuery 
    : (AboutPageQuery as any)?.loc?.source?.body || "";

  // 1. Fetch About Page Content
  const data = await fetchGraphQL(queryStr, {
    id: "60", // Ensure this ID matches your About Page in WP
    idType: "DATABASE_ID"
  });

  // 2. Fetch Newsletter Settings from Options Page
  let newsletterData = null;
  try {
    const newsletterRes = await fetchGraphQL(GetNewsletterSettings);
    // Map from page instead of acfOptionsPage (matching homepage logic)
    newsletterData = newsletterRes?.page?.globalSettings;
  } catch (error) {
    console.error("Newsletter query failed on About page:", error);
  }

  const page = data?.page;
  const fields = page?.aboutPage;
  
  return (
    <main>
      <Hero 
        title={fields?.heroTitle || page?.title}
        subtitle={fields?.heroSubtitle}
        buttonText={fields?.heroButtonText}
        buttonLink={fields?.heroButtonLink}
        bgImage={page?.featuredImage?.node?.sourceUrl}
        bgPosition="center"
      />

      <AboutIntroduction data={fields} />
      
      <MissionVision data={fields} />
      
      {/* Renders beautifully if globalSettings are retrieved successfully */}
      {newsletterData && <Newsletter data={newsletterData} />}
      
      <CommunityCTA />
      
      <VisitSanctuary 
        title={fields?.sanctuaryTitle} 
        subtitle={fields?.sanctuarySubtitle} 
        address={fields?.address} 
        phone={fields?.phone} 
        email={fields?.email} 
        hours={fields?.hours} 
      />
    </main>
  );
}