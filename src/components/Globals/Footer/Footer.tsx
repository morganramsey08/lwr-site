"use client";
import React from 'react';
import Link from 'next/link';
import { FacebookLogoIcon, InstagramLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Column 1: Intro */}
          <div className={styles.columnIntro}>
            <h3>Living Water Retreat</h3>
            <p>
              A sanctuary for wellness, healing, and spiritual growth in harmony with nature's wisdom.
            </p>
            
            <div className={styles.socials}>
              <Link href="https://facebook.com/lightworkerranch" target="_blank" className={styles.socialIcon}>
                <FacebookLogoIcon size={22} weight="light" />
              </Link>
              <Link href="https://instagram.com/lightworkerranch" target="_blank" className={styles.socialIcon}>
                <InstagramLogoIcon size={22} weight="light" />
              </Link>
              <Link href="https://youtube.com/@lightworkerranch" target="_blank" className={styles.socialIcon}>
                <YoutubeLogoIcon size={22} weight="light" />
              </Link>
            </div>
          </div>
          
          {/* Wrapper for Link Columns to handle mobile layout better */}
          <div className={styles.linksWrapper}>
            {/* Column 2: Quick Links */}
            <div className={styles.columnLinks}>
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/about">About LWR</Link></li>
                <li><Link href="/offerings">Offerings</Link></li>
                <li><Link href="/calendar">Calendar</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Programs */}
            <div className={styles.columnLinks}>
              <h4>Programs</h4>
              <ul>
                <li><Link href="/teachers">Teachers</Link></li>
                <li><Link href="/memberships">Memberships</Link></li>
                <li><Link href="/ignite">Ignite Your Light</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} Living Water Retreat. All rights reserved. Designed with love for your wellness journey.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;