import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { MembershipsPageQuery } from "@/queries/general/getPageContent";
import Image from "next/image";
import styles from "./Memberships.module.scss";

export default async function MembershipsPage() {
 const data = await fetchGraphQL(MembershipsPageQuery, { 
  id: "101" 
});

const page = data?.page;
const bgImage = page?.featuredImage?.node?.sourceUrl;

console.log("Featured Image URL:", bgImage); // Check your terminal for this!

  if (!page) return <div className="container">Page content not found.</div>;

  return (
    <div className={styles.membershipsPage}>
      <header className={styles.hero}>
        {page.featuredImage?.node?.sourceUrl && (
          <Image 
            src={page.featuredImage.node.sourceUrl} 
            alt={page.title}
            fill
            priority
            className={styles.heroImage}
          />
        )}

        <div className={styles.content}>
          <h1>{page.title}</h1>
        </div>
      </header>

      <main className={`container ${styles.mainContent}`}>
        <div 
          className={styles.bodyText}
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
      </main>
    </div>
  );
}