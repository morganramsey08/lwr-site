import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { HomeHeroQuery } from "@/queries/general/getHomePage";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Sanctuary from "@/components/Sanctuary/Sanctuary";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";

/**
 * Helper to convert the 'gql' object into a string for fetchGraphQL.
 */
function getQueryString(query: any): string {
  if (typeof query === 'string') return query;
  return query?.loc?.source?.body || "";
}

export default async function Page() {
  const data = await fetchGraphQL(getQueryString(HomeHeroQuery), {
    id: "/",
    idType: "URI"
  });

 const page = data?.page;
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
  </main>
);
}