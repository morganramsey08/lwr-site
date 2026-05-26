import React from 'react';
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { HealingHandsPageQuery } from "@/queries/general/getHealingHandPage"; 
import Hero from "@/components/Hero/Hero";
import PractitionerCard from "@/components/PractitionerCard/PractitionerCard";
import s from "./HealingHands.module.scss";

export default async function HealingHandsPage() {
  const data = await fetchGraphQL(HealingHandsPageQuery);
  const page = data?.page;
  const practitioners = data?.healingHandsPractitioners?.nodes || [];
  
  if (!page) {
    return (
      <div className={s.errorContainer}>
        <p>Page content could not be loaded.</p>
      </div>
    );
  }

  const heroBg = page.featuredImage?.node?.sourceUrl || "https://admin.lightworkerranch.com/wp-content/uploads/2026/05/IMG_1171.jpg";

  return (
    <div className={s.pageWrapper}>
      <Hero 
        title={page.title}
        subtitle='Healing Hands is our Monthly Moonlighting Rotation of Wellness Practitioners. Reserve your time while visiting LightWorker Ranch or contact Dani directly for each practitioners availability.'
        bgImage={heroBg}
        isShort
        bgPosition="center"
      />

      <div className={s.contentContainer}>
        
        <article className={s.mainContent} dangerouslySetInnerHTML={{ __html: page.content || "" }} />
        
        <div className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>Healing Hands Practitioners</h2>
          <div className={s.divider}></div>
        </div>
        
        {/* Updated class here to point to the local practitionerGrid */}
        <div className={s.practitionerGrid}>
          {practitioners.map((p: any) => (
            <PractitionerCard key={p.id} practitioner={p} />
          ))}
        </div>

      </div>
    </div>
  );
}