// src/components/About/AboutIntroduction.tsx
import Image from 'next/image';
import styles from './About.module.scss';

export default function AboutIntroduction({ data }: { data: any }) {
  // We'll use the Intro specific fields from your ACF
  return (
    <section className={styles.introSectionForest}>
      <div className="container">
        <div className={styles.introGrid}>
          
          <div className={styles.introContentLeft}>
            <h2>{data?.introTitle || "Wellness Immersed in Nature"}</h2>
            <div className={styles.introBody}>
              {data?.introText?.split('\n').map((line: string, i: number) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className={styles.introImageSide}>
            <div className={styles.imageContainer}>
              <Image 
                src={data?.introImage?.node?.sourceUrl || '/placeholder-nature.jpg'} 
                alt="Wellness in Nature"
                width={600}
                height={500}
                className={styles.sideImage}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}