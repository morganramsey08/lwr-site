import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { AboutPageQuery } from "@/queries/general/getAboutPage";
import Hero from "@/components/Hero/Hero";
import AboutIntroduction from "@/components/About/AboutIntroduction";
import MissionVision from "@/components/About/MissionVision";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";
import VisitSanctuary from "@/components/Sanctuary/Sanctuary";

export default async function AboutPage() {
    const queryStr = typeof AboutPageQuery === 'string' 
    ? AboutPageQuery 
    : (AboutPageQuery as any)?.loc?.source?.body || "";

    const data = await fetchGraphQL(queryStr, {
    id: "60", // Replace with your actual About page ID
    idType: "DATABASE_ID"
    });

  const page = data?.page;
  const fields = page?.aboutPage;
  
console.log("ACF Data Check:", fields); // Check your terminal/server log
  return (
    <main>
      <Hero 
        title={fields?.heroTitle || page?.title}
        subtitle={fields?.heroSubtitle}
        buttonText={fields?.heroButtonText}
        buttonLink={fields?.heroButtonLink}
        bgImage={page?.featuredImage?.node?.sourceUrl}
      />
      <AboutIntroduction data={fields} />
      
      <MissionVision data={fields} />
      
      <CommunityCTA />
      
      <VisitSanctuary />
    </main>
  );
}