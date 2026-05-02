import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { HomeHeroQuery } from "@/queries/general/getHomePage";
import { GetNewsletterSettings } from "@/queries/general/getNewsletter";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Sanctuary from "@/components/Sanctuary/Sanctuary";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";
import Newsletter from "@/components/Newsletter/Newsletter";

function getQueryString(query: any): string {
  if (typeof query === 'string') return query;
  return query?.loc?.source?.body || "";
}

export default async function Page() {
  // 1. Fetch Home Page Content
  const homeRes = await fetchGraphQL(getQueryString(HomeHeroQuery), {
    id: "/",
    idType: "URI"
  });

  // 2. Fetch Newsletter Settings from Options Page
 let newsletterData = null;
try {
  const newsletterRes = await fetchGraphQL(GetNewsletterSettings);
  // Map from page instead of acfOptionsPage
  newsletterData = newsletterRes?.page?.globalSettings;
} catch (error) {
  console.error("Newsletter query failed:", error);
}

  const page = homeRes?.page;
  const acf = page?.homePage;

  if (!acf) return null;

  return (
    <main>
      <Hero 
        title={acf.heroTitle || page?.title}
        subtitle={acf.heroSubTitle}
        buttonText={acf.heroButtonText}
        buttonLink={acf.heroButtonUrl}
        bgImage={page?.featuredImage?.node?.sourceUrl} 
      />
      <About 
        title={acf.title}
        content={acf.content}
        buttonLabel={acf.buttonLabel}
        imageUrl={acf.aboutImage?.node?.sourceUrl} 
      />
      <Sanctuary 
        title={acf.sanctuaryTitle} 
        subtitle={acf.sanctuarySubtitle} 
        address={acf.address} 
        phone={acf.phone} 
        email={acf.email} 
        hours={acf.hours} 
      />
      <CommunityCTA/>
      
      {/* Only render if the globalSettings data was successfully retrieved */}
      {newsletterData && <Newsletter data={newsletterData} />}
    </main>
  );
}