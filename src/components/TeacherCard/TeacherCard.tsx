'use client';

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
          <p className={styles.jobTitle}>{fields.teacherTitle}</p>
        )}
        
        <div 
          className={styles.bio}
          dangerouslySetInnerHTML={{ __html: teacher.content }} 
        />
        
        <div className={styles.socials}>
          {fields?.socialMediaInstagram && (
            <a href={fields.socialMediaInstagram} target="_blank" rel="noreferrer" className={styles.iconLink}>
              <InstagramLogoIcon size={18} weight="light" />
            </a>
          )}
          {fields?.socialMediaFacebook && (
            <a href={fields.socialMediaFacebook} target="_blank" rel="noreferrer" className={styles.iconLink}>
              <FacebookLogoIcon size={18} weight="light" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}