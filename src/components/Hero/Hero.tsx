import React from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* This pulls from the /public folder automatically */}
      <img 
        src="img/homepage-hero.jpg" 
        alt="Wellness Immersed in Nature" 
        className={styles.heroImage} 
      />
      <div className={styles.content}>
        <h1>Wellness Immersed in Nature</h1>
        <p>
          At Lightworker Ranch, we believe in the transformative power of connecting with nature. 
          Our sanctuary offers a peaceful space where you can relax, recharge, and rediscover your well-being.
        </p>
        <button className={styles.button}>Browse Calendar</button>
      </div>
    </section>
  );
};

export default Hero;