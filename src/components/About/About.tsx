import Image from 'next/image';
import styles from './About.module.scss';

interface AboutProps {
  title: string;
  content: string;
  buttonLabel: string;
  imageUrl?: string;
  imageAlt?: string;
}

const About = ({ title, content, buttonLabel, imageUrl, imageAlt }: AboutProps) => {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          
          <div className={styles.content}>
            <h2>{title}</h2>
            <div className={styles.body}>
              {/* Preserves line breaks from WP Textarea */}
              {content?.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {buttonLabel && (
              <button className={styles.button}>{buttonLabel}</button>
            )}
          </div>

          <div className={styles.imageWrapper}>
            {imageUrl && (
              <Image 
                src={imageUrl} 
                alt={imageAlt || title} 
                width={600} 
                height={600}
                className={styles.image}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;