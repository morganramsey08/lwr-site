// src/components/About/MissionVision.tsx
import React from 'react';
import * as LucideIcons from 'lucide-react';
import styles from './About.module.scss';

export default function MissionVision({ data }: { data: any }) {
  const IconRenderer = ({ name }: { name: string }) => {
    const iconName = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Heart';
    const LucideIcon = (LucideIcons as any)[iconName] || LucideIcons.Heart;
    return <LucideIcon size={28} color="white" fill="white" />;
  };

  const values = [
    { title: data?.valueOneTitle, text: data?.valueOneText, icon: data?.valueOneIcon },
    { title: data?.valueTwoTitle, text: data?.valueTwoText, icon: data?.valueTwoIcon },
    { title: data?.valueThreeTitle, text: data?.valueThreeText, icon: data?.valueThreeIcon },
  ];

  return (
    <section className={styles.missionSection}>
      <div className="container">
        {/* CENTERED HEADER CONTENT */}
        <div className={styles.missionHeader}>
          <h2>{data?.missionTitle || "Our Mission & Vision"}</h2>
          <div className={styles.missionSubtext}>
            {data?.missionSection?.split('\n').map((line: string, i: number) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {/* CARDS GRID */}
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.iconCircle}>
                <IconRenderer name={v.icon} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}