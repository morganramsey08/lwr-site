import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { TeachersPageQuery } from "@/queries/general/getTeachers";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import Image from "next/image";
import styles from "./Teachers.module.scss";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function TeachersPage() {
  const data = await fetchGraphQL(TeachersPageQuery);
  
  // Extract both datasets from our updated query structure
  const pageData = data?.page;
  const teachers = data?.teachers?.nodes;

  // Fallback image path just in case an admin accidentally clears it out in WP
  const heroBg = pageData?.featuredImage?.node?.sourceUrl || "/images/guides-hero-bg.jpg";

  return (
    <div className={styles.teachersPage}>
      <header className={styles.hero}>
        {/* The Hero Image - Now fully dynamic from WordPress ID 99! */}
        <Image 
          src={heroBg} 
          alt="Our Guides Background"
          fill
          priority
          className={styles.heroImage}
        />
        <div className='container'>
          <div className={styles.content}>
            <h1>{pageData?.title || "Our Guides"}</h1>
            <p>
              Meet our dedicated team of experienced practitioners, committed to
              supporting your journey toward healing, clarity, and spiritual transformation.
            </p>
          </div>
        </div>
      </header>

      <main className={`container ${styles.gridContainer}`}>
        <div className={styles.teacherGrid}>
          {teachers?.map((teacher: any) => (
            <TeacherCard key={teacher.title} teacher={teacher} />
          ))}
        </div>
      </main>
    </div>
  );
}