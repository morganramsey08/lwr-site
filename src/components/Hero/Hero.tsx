import styles from './Hero.module.scss'; 

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText?: string; // Made optional in case short headers don't have calls-to-action
  buttonLink?: string;
  bgImage?: string;
  isShort?: boolean;   // <-- Added optional prop variable
}

const Hero = ({ title, subtitle, buttonText, bgImage, buttonLink, isShort = false }: HeroProps) => {
  return (
    /* Combines the base hero class with the short modifier conditionally */
    <section className={`${styles.hero} ${isShort ? styles.short : ''}`}>
      {/* 1. Use an img tag to utilize your .heroImage styles and filters */}
      {bgImage && (
        <img 
          src={bgImage} 
          alt={title} 
          className={styles.heroImage} 
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