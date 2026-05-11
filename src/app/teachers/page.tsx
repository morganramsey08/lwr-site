import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { TeachersPageQuery } from "@/queries/general/getTeachers";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import Image from "next/image"; // Import Next.js Image
import styles from "./Teachers.module.scss";

export default async function TeachersPage() {
  const data = await fetchGraphQL(TeachersPageQuery);
  const teachers = data?.teachers?.nodes;

  return (
    <div className={styles.teachersPage}>
      <header className={styles.hero}>
        {/* The Hero Image - Matches your CSS expectations */}
        <Image 
          src="/images/guides-hero-bg.jpg" // Path to your nature background
          alt="Our Guides Background"
          fill
          priority
          className={styles.heroImage}
        />
<div className='container'>
        <div className={styles.content}>
          <h1>Our Guides</h1>
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