import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageContentQuery } from "@/queries/general/getPageContent";
import Image from "next/image";
import styles from "./Ignite.module.scss";

export default async function IgnitePage() {
  // Pass the slug of the page as the ID
  const data = await fetchGraphQL(PageContentQuery, { id: "ignite-your-light" });
  const page = data?.page;

  if (!page) return <div>Page not found</div>;

  return (
    <div className={styles.ignitePage}>
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