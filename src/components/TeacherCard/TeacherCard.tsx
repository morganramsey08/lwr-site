'use client'; // This is now safe because we aren't fetching data here

import { FacebookLogoIcon, InstagramLogoIcon } from '@phosphor-icons/react';
import styles from '@/app/teachers/Teachers.module.scss';

export default function TeacherCard({ teacher }: { teacher: any }) {
  const imageUrl = teacher.featuredImage?.node?.sourceUrl;
  const fields = teacher.teachers;

  return (
    <article className={styles.teacherCard}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl || '/placeholder.jpg'} alt={teacher.title} />
      </div>
      
      <div className={styles.details}>
        <h2 className={styles.name}>{teacher.title}</h2>
        {fields?.teacherTitle && (
          <span className={styles.jobTitle}>{fields.teacherTitle}</span>
        )}
        
        <div 
          className={styles.bio}
          dangerouslySetInnerHTML={{ __html: teacher.content }} 
        />
        
        <div className={styles.socials}>
          {fields?.socialMediaInstagram && (
            <a href={fields.socialMediaInstagram} target="_blank" rel="noreferrer" className={styles.iconLink}>
              <InstagramLogoIcon size={20} weight="regular" />
            </a>
          )}
          {fields?.socialMediaFacebook && (
            <a href={fields.socialMediaFacebook} target="_blank" rel="noreferrer" className={styles.iconLink}>
              <FacebookLogoIcon size={20} weight="regular" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}