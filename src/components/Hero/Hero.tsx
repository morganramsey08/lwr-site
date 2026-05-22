import styles from './Hero.module.scss'; 

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText?: string; 
  buttonLink?: string;
  bgImage?: string;
  isShort?: boolean;   
  bgPosition?: 'top' | 'center' | 'bottom'; // <-- Added optional position prop variable
}

const Hero = ({ 
  title, 
  subtitle, 
  buttonText, 
  bgImage, 
  buttonLink, 
  isShort = false,
  bgPosition = 'bottom' // <-- Default to bottom alignment
}: HeroProps) => {
  return (
    <section className={`${styles.hero} ${isShort ? styles.short : ''}`}>
      {bgImage && (
        <img 
          src={bgImage} 
          alt={title} 
          className={styles.heroImage} 
          // Injecting the choice cleanly via a native CSS variable
          style={{ '--hero-bg-pos': bgPosition } as React.CSSProperties} 
        />
      )}

      <div className='container'>
        <div className={styles.content}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {buttonText && (
            <a href={buttonLink} className={styles.button}>
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;