'use client';

import { FacebookLogoIcon, InstagramLogoIcon } from '@phosphor-icons/react';
import styles from '@/app/teachers/Teachers.module.scss'; // Reusing your teacher styles

export default function PractitionerCard({ practitioner }: { practitioner: any }) {
  const imageUrl = practitioner.featuredImage?.node?.sourceUrl;
  
  // Drill into the ACF field group using the name from your settings
  const fields = practitioner.healingHandsPractitioners; 

  return (
    <article className={styles.teacherCard}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl || '/placeholder.jpg'} alt={practitioner.title} />
      </div>
      
      <div className={styles.details}>
        <h2 className={styles.name}>{practitioner.title}</h2>
        
        {fields?.practitionerTitle && (
          <p className={styles.jobTitle}>{fields.practitionerTitle}</p>
        )}
        
        <div 
          className={styles.bio} 
          dangerouslySetInnerHTML={{ __html: practitioner.content || "" }} 
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