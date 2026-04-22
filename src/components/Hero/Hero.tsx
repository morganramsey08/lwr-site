import styles from './Hero.module.scss'; 

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  bgImage?: string;
}

const Hero = ({ title, subtitle, buttonText, bgImage }: HeroProps) => {
  return (
    <section className={styles.hero}>
      {/* 1. Use an img tag to utilize your .heroImage styles and filters */}
      {bgImage && (
        <img 
          src={bgImage} 
          alt={title} 
          className={styles.heroImage} 
        />
      )}

      {/* 2. Changed 'container' to 'content' to match your SCSS nesting */}
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </section>
  );
};

export default Hero;