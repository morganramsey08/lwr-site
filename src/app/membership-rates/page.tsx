import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { MembershipsPageQuery } from "@/queries/general/getPageContent";
import Image from "next/image";
import styles from "./Memberships.module.scss";

export default async function MembershipsPage() {
const data = await fetchGraphQL(MembershipsPageQuery, { 
  id: "101", 
  parentId: "101" 
});

const page = data?.page;
const bgImage = data?.mediaItems?.nodes[0]?.sourceUrl;

return (
  <main>
    <header className={styles.hero}>
      {bgImage && (
        <img 
          src={bgImage} 
          alt={page?.title} 
          className={styles.heroImage} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <div className={styles.content}>
        <h1>{page?.title}</h1>
      </div>
    </header>

    <section className="container">
       <div dangerouslySetInnerHTML={{ __html: page?.content }} />
    </section>
  </main>
);
}