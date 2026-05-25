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
          <div className={styles.columnIntro}>
            <h3>LightWorker Ranch</h3>
            <p>
              A wellness center immersed in nature and faith.
            </p>
            
            <div className={styles.socials}>
              <Link href="https://facebook.com/lightworkerranch" target="_blank" className={styles.socialIcon}>
                <FacebookLogoIcon size={22} weight="light" />
              </Link>
              <Link href="https://www.instagram.com/lightworker_ranch" target="_blank" className={styles.socialIcon}>
                <InstagramLogoIcon size={22} weight="light" />
              </Link>
              {/* <Link href="https://youtube.com/@lightworkerranch" target="_blank" className={styles.socialIcon}>
                <YoutubeLogoIcon size={22} weight="light" />
              </Link> */}
            </div>
          </div>
          
          {/* Wrapper for Link Columns to handle mobile layout better */}
          <div className={styles.linksWrapper}>
            {/* Column 2: Quick Links */}
            <div className={styles.columnLinks}>
              <h4><strong>Quick Links</strong></h4>
              <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/about">About LWR</Link></li>
                <li><Link href="/offerings">Offerings</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Programs */}
            <div className={styles.columnLinks}>
              <h4><strong><br /></strong></h4>
              <ul>
                <li><Link href="/teachers">Guides</Link></li>
                <li><Link href="/membership-rates">Rates & Memberships</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} LightWorker Ranch. All rights reserved. Designed with love for your wellness journey.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;