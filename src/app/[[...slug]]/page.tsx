import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { HomeHeroQuery } from "@/queries/general/getHomePage";
import Hero from "@/components/Hero/Hero";

/**
 * Helper to convert the 'gql' object into a string for fetchGraphQL.
 * If you ever get a 'query.replace' error, this ensures it's a string.
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

  return (
    <main>
      <Hero 
        title={acf?.heroTitle || page?.title}
        subtitle={acf?.heroSubTitle || ""}
        buttonText={acf?.heroButtonText || ""}
        // Grab the featured image source URL here
        bgImage={page?.featuredImage?.node?.sourceUrl} 
      />
    </main>
  );
}