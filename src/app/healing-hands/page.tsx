import React from 'react';
import { fetchGraphQL } from "@/utils/fetchGraphQL"; // Adjust this import path to match your project structure
import Hero from "@/components/Hero/Hero";
import s from "./HealingHands.module.scss";

interface WordPressPageResponse {
  page: {
    title: string;
    content: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

const GET_HEALING_HANDS_PAGE = `
  query GetHealingHandsPage {
    page(id: "healing-hands", idType: URI) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default async function HealingHandsPage() {
  const data = await fetchGraphQL<WordPressPageResponse>(GET_HEALING_HANDS_PAGE);
  
  if (!data?.page) {
    return (
      <div className={s.errorContainer}>
        <p>Page content could not be loaded. Please verify the "healing-hands" slug exists in WordPress.</p>
      </div>
    );
  }

  const { title, content, featuredImage } = data.page;
  const heroBg = featuredImage?.node?.sourceUrl || "https://admin.lightworkerranch.com/wp-content/uploads/2026/05/IMG_1171.jpg"; // Fallback image just in case

  return (
    <div className={s.pageWrapper}>
      <Hero 
        title={title}
        subtitle='Healing Hands is our Monthly Moonlighting Rotation of Wellness Practitioners. Reserve your time while visiting LightWorker Ranch or contact Dani directly for each practitioners availability.'
        bgImage={heroBg}
        buttonText="" // Safeguard for strict TypeScript definitions
        isShort
        bgPosition="center"
      />

      <div className={s.contentContainer}>
        {/* Safely inject the rich text content coming directly from the WordPress Gutenberg/Classic editor */}
        <article 
          className={s.mainContent}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </div>
  );
}