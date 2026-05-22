import React from 'react';
import Hero from "@/components/Hero/Hero";
import s from "./Memberships.module.scss";

// ==========================================
// CONTENT CONFIGURATION (Edit text & prices here)
// ==========================================
const heroSrc="https://admin.lightworkerranch.com/wp-content/uploads/2026/05/IMG_1176.jpg";

const MEMBERSHIPS_CONTENT = {
  hero: {
    title: "Rates & Memberships",
    subtitle: '"You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house. In the same way, let your light shine before others..." — Matthew 5:14-16',
    bgImage: heroSrc
  },
  visitors: {
    title: "Visitors of the Light",
    cards: [
      {
        tag: "Single Session",
        title: "Class Drop-In",
        price: "$15",
        description: "Join any standard yoga or movement class."
      },
      {
        tag: "Healing Experience",
        title: "Sound Journey",
        price: "$20",
        description: "A deep meditative sound immersion for the soul."
      },
      {
        tag: "Package",
        title: "Rising Star Punch Card",
        price: "$130",
        description: "10 classes. Journey ends 3 months from purchase.",
        badge: "11th Class is free!"
      }
    ]
  },
  eternalFlame: {
    title: "Eternal Flame Memberships",
    cards: [
      {
        tag: "Premium Commitment",
        title: "Full Membership",
        price: "$124",
        period: "/ month",
        checklist: [
          "Unlimited Classes",
          "1 Sound Journey per month",
          "Unlimited Sauna & Cave Shower",
          "Greenhouse Privileges & Free Ice"
        ]
      },
      {
        tag: "Cash Discount",
        title: "Cash Membership",
        price: "$120",
        period: "/ month",
        description: "Save $4 every month when paying with Cash or Check. Prorated at time of purchase."
      },
      {
        tag: "Limited Time",
        title: "Soft Opening Special",
        price: "$100",
        period: "/ month",
        description: "Grand Opening Special available for the first week only.",
        badge: "June 15th through the week of Grand Opening Only!",
        isFeatured: false
      }
    ]
  },

  waterYoga: {
    title: "Water Yoga",
    cards: [
      {
        tag: "Community Offering",
        title: "Sizzling Seniors Free Water Wellness",
        price: "free",
        period: "/ thursdays 10am",
        checklist: [
          "First Class June 4th",
          "Quitman City Pool",
        ]
      },
      {
        tag: "Drop In",
        title: "Lands Zen Water Yoga Drop In",
        price: "$20",
        period: "/ drop in",
        description: "The Links at Lands End Pool, 285 Private Road 5980 Yantis, TX",
        checklist: [
          "The Links at Lands End Pool",
          "LandZen Water Yoga Series",
          "Rain outs made up"
        ]
      },
      {
        tag: "Series Deal",
        title: "10 Series at Lands Zen Water Yoga",
        price: "$220",
        period: "/ 10 series",
        description: "The Links at Lands End Pool, 285 Private Road 5980 Yantis, TX",
        checklist: [
          "The Links at Lands End Pool",
          "LandZen Water Yoga Series",
          "Rain outs made up"
        ]
      }
    ]
  },
  elderOfferings: {
    title: "Silver Sage Light Offerings for Elders",
    description: "Monday, Wednesday & some Fridays at 2 PM. Specifically curated for our elder community members.",
    pills: [
      { text: "Suggested Heart-Centered Contribution: $5", isOrange: false },
      { text: "Free Community Offerings Available", isOrange: true }
    ],
    sponsoredBy: "Local Light Supporters"
  },
  amenities: {
    title: "Single Amenities",
    name: "Hot Rock Sauna & Cave Shower Pass",
    subtext: "Included for Eternal Flame Members",
    price: "$5",
    notice: "Custom Hot Rock Sauna build coming soon — October 2026"
  },
  faqs: {
    title: "Common Questions",
    list: [
      {
        icon: "❓",
        question: "How do I register for a class?",
        answer: "At this time there is no need to pre-register. Just arrive 15-20 minutes early for your first class to meet & greet, sign our digital waiver, and get a tour of the space."
      },
      {
        icon: "💼",
        question: "How do I pay for a class?",
        answer: "We accept Credit Card, Venmo, Check, and Cash.",
        alertText: "Reminder: Payment by Cash or Check for monthly dues saves you a $4 discount!"
      }
    ]
  }
};

// ==========================================
// PAGE COMPONENT
// ==========================================
export default function MembershipsRatesPage() {
  const c = MEMBERSHIPS_CONTENT;

  return (
    <div className={s.pageWrapper}>
      {/* 1. Hero */}
      <Hero 
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        bgImage={c.hero.bgImage} buttonText={''}      />

      {/* Global Container Wrapper */}
      <div className={s.contentContainer}>
        
        {/* 2. Visitors of the Light */}
        <section className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>{c.visitors.title}</h2>
          <div className={s.divider} />
          
          <div className={s.grid3}>
            {c.visitors.cards.map((card, i) => (
              <div key={i} className={s.card}>
                <div>
                  <span className={s.tag}>{card.tag}</span>
                  <h3 className={s.cardTitle}>{card.title}</h3>
                  <div className={s.priceContainer}>
                    <span className={s.price}>{card.price}</span>
                  </div>
                </div>
                <div>
                  <p className={s.description}>{card.description}</p>
                  {card.badge && <span className={s.badge}>{card.badge}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Eternal Flame Memberships */}
        <section className={s.sectionCenter} style={{ marginBottom: '60px' }}>
          <h2 className={s.sectionTitle}>{c.eternalFlame.title}</h2>
          <div className={s.divider} />

          <div className={s.grid3}>
            {c.eternalFlame.cards.map((card, i) => {
              const cardClass = card.isFeatured ? s.cardFeatured : s.card;
              return (
                <div key={i} className={cardClass}>
                  <div style={{ width: '100%' }}>
                    <span className={s.tag}>{card.tag}</span>
                    <h3 className={s.cardTitle}>{card.title}</h3>
                    <div className={s.priceContainer}>
                      <span className={s.price}>{card.price}</span>
                      {card.period && <span className={s.period}>{card.period}</span>}
                    </div>
                    
                    {card.checklist && (
                      <ul className={s.checklist}>
                        {card.checklist.map((item, idx) => (
                          <li key={idx}>
                            <span className={s.check}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {card.description && <p className={s.description}>{card.description}</p>}
                  </div>
                  {card.badge && (
                    <span className={card.isFeatured ? s.badgeOrange : s.badge}>
                      {card.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Water Yoga Memberships */}
        <section className={s.sectionCenter} style={{ marginBottom: '60px' }}>
          <h2 className={s.sectionTitle}>{c.waterYoga.title}</h2>
          <div className={s.divider} />

          <div className={s.grid3}>
            {c.waterYoga.cards.map((card, i) => {
              const cardClass = card.isFeatured ? s.cardFeatured : s.card;
              return (
                <div key={i} className={cardClass}>
                  <div style={{ width: '100%' }}>
                    <span className={s.tag}>{card.tag}</span>
                    <h3 className={s.cardTitle}>{card.title}</h3>
                    <div className={s.priceContainer}>
                      <span className={s.price}>{card.price}</span>
                      {card.period && <span className={s.period}>{card.period}</span>}
                    </div>
                    
                    {card.checklist && (
                      <ul className={s.checklist}>
                        {card.checklist.map((item, idx) => (
                          <li key={idx}>
                            <span className={s.check}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {card.description && <p className={s.description}>{card.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Elder Offerings Banner */}
        <section style={{ marginBottom: '60px' }}>
          <div className={s.elderBanner}>
            <div className={s.elderLeft}>
              <h3>{c.elderOfferings.title}</h3>
              <p>{c.elderOfferings.description}</p>
              <div className={s.pillContainer}>
                {c.elderOfferings.pills.map((pill, i) => (
                  <span key={i} className={pill.isOrange ? s.pillOrange : s.pill}>
                    {pill.text}
                  </span>
                ))}
              </div>
            </div>
            <div className={s.elderRight}>
              <span className={s.sponsored}>Sponsored By</span>
              <span className={s.supporter}>{c.elderOfferings.sponsoredBy}</span>
            </div>
          </div>
        </section>

        {/* 5. Amenities & FAQ Split Footer Layout */}
        <section className={s.splitGrid}>
          <div>
            <h4>{c.amenities.title}</h4>
            <div className={s.amenityRow}>
              <div>
                <h5>{c.amenities.name}</h5>
                <p>{c.amenities.subtext}</p>
              </div>
              <span className={s.amenityPrice}>{c.amenities.price}</span>
            </div>
            <div className={s.noticeBar}>
              <span>🕒</span>
              <p>{c.amenities.notice}</p>
            </div>
          </div>

          <div>
            <h4>{c.faqs.title}</h4>
            {c.faqs.list.map((faq, i) => (
              <div key={i} className={s.faqBlock}>
                <h5>
                  <span className={s.icon}>{faq.icon}</span> 
                  {faq.question}
                </h5>
                <p>
                  {faq.answer}
                  {faq.alertText && <span className={s.alertText}>{faq.alertText}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}