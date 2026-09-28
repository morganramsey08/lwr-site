'use client';

import React, { useState } from 'react';
import Hero from "@/components/Hero/Hero";
import { Check, CreditCard, Heart, ArrowRight, ShieldCheck, Award, Sparkles } from 'lucide-react';
import s from "./Memberships.module.scss";
import Link from "next/link";

const heroSrc = "https://admin.lightworkerranch.com/wp-content/uploads/2026/05/IMG_1176.jpg";

const MEMBERSHIPS_CONTENT = {
  hero: { 
    title: "Rates & Memberships", 
    subtitle: '"You are the light of the world... let your light shine before others..." — Matthew 5:14-16', 
    bgImage: heroSrc 
  },
  heroesInfo: {
    title: "Heroes & Wisdom Keepers get a break for Eternal Flame Memberships.",
    description: "We proudly honor our Teachers, First Responders, Veterans, and Seniors (60+) with discounted membership rates on all Eternal Flame plans.",
    groups: ["Teachers", "First Responders", "Veterans", "Seniors 60+"]
  },
  visitors: {
    title: "Visitors of the Light (Passes & Drop-Ins)",
    cards: [
      { 
        tag: "Single Class", 
        title: "Standard Class Drop-In", 
        cardPrice: "$15.60", 
        cashPrice: "$15", 
        description: "Join any standard yoga or movement class." 
      },
      { 
        tag: "Healing Experience", 
        title: "Sacred Sound Journey", 
        cardPrice: "$26.00", 
        cashPrice: "$25", 
        description: "Premium single-entry rate for standalone sound healing events." 
      },
      { 
        tag: "10-Class Pass", 
        title: "Rising Star Punch Card", 
        cardPrice: "$135.20", 
        cashPrice: "$130", 
        description: "Double punch for Sound Journeys. Standard classes = 1 punch. Expires 3 months from purchase.", 
        badge: "Complete the journey & the 11th class is free!" 
      }
    ]
  },
  eternalFlame: {
    title: "Eternal Flame Memberships",
    subtitle: "Includes unlimited standard classes & all Sacred Sound Journeys.",
    plans: [
      {
        tag: "Flexible Monthly",
        title: "Month-to-Month",
        standard: { cardPrice: "$104.00", cashPrice: "$100", note: "/ month" },
        heroes: { cardPrice: "$88.40", cashPrice: "$85", note: "/ month" },
        description: "Includes unlimited standard classes & Sound Journeys. First month is prorated, then dues are billed on the 1st of each month.",
        checklist: ["Unlimited Standard Classes", "All Sacred Sound Journeys Included", "Prorated First Month"]
      },
      {
        tag: "6-Month Commitment",
        title: "6-Month Paid-in-Full",
        popular: false,
        standard: { cardPrice: "$520.00", cashPrice: "$500", note: "total (~$83.33/mo)" },
        heroes: { cardPrice: "$468.00", cashPrice: "$450", note: "total (~$75.00/mo)" },
        description: "Standard gets 1 Month Free compared to single-month rates. Heroes gets a fixed, beautiful community break.",
        badge: "Standard: 1 Month Free | Heroes: $75/mo Cash",
        checklist: ["Unlimited Standard Classes", "All Sacred Sound Journeys Included", "Fixed Community Savings"]
      },
      {
        tag: "Best Deal",
        title: "1-Year Paid-in-Full",
        popular: true,
        standard: { cardPrice: "$988.00", cashPrice: "$950", note: "total (~$79.16/mo)" },
        heroes: { cardPrice: "$884.00", cashPrice: "$850", note: "total (~$70.83/mo)" },
        description: "Standard gets 2.5 Months Free! Heroes gets a deep upfront break on sanctuary practices. Absolute best value!",
        badge: "Standard: 2.5 Months Free | Heroes: ~$70.83/mo Cash",
        checklist: ["Unlimited Standard Classes", "All Sacred Sound Journeys Included", "Deepest Upfront Savings"]
      }
    ]
  },
  waterYoga: {
    title: "Water Yoga",
    cards: [
      { 
        tag: "Private Sessions", 
        title: "Dani is available for Privates, Pop-Ups or Parties. Contact for booking!", 
      }
    ]
  },
  elderOfferings: {
    title: "Silver Sage Light Offerings for Elders - $5 Suggested Contribution",
    description: "Mondays at 2 PM. Specifically curated for our elder community members.",
    sponsoredBy: "Holy Ghost Chair Yoga"
  },
  faqs: {
    title: "Common Questions",
    list: [
      { icon: <CreditCard size={18} />, question: "How do I pay?", answer: "We accept Credit Card, Check, and Cash." },
      { icon: <Heart size={18} />, question: "What should I bring?", answer: "An open heart and comfortable attire." }
    ]
  }
};

export default function MembershipsRatesPage() {
  const c = MEMBERSHIPS_CONTENT;
  const [rateType, setRateType] = useState<'standard' | 'heroes'>('standard');

  const PriceDisplay = ({ cardPrice, cashPrice, note }: { cardPrice: string; cashPrice: string; note?: string }) => (
    <div className={s.priceWrapper}>
      <div className={s.priceComparison}>
        <div className={s.priceBlock}>
          <span className={s.priceValue}>{cardPrice}</span>
          <span className={s.priceLabel}>Card</span>
        </div>
        <span className={s.separator}>/</span>
        <div className={s.priceBlock}>
          <span className={s.priceValueCash}>{cashPrice}</span>
          <span className={s.priceLabelCash}>Cash</span>
        </div>
      </div>
      {note && <span className={s.priceNote}>{note}</span>}
    </div>
  );

  return (
    <div className={s.pageWrapper}>
      <Hero title={c.hero.title} subtitle={c.hero.subtitle} bgImage={c.hero.bgImage} buttonText={''} />
      
      <div className={s.contentContainer}>
        {/* Visitors Section */}
        <section className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>{c.visitors.title}</h2>
          <div className={s.grid3}>
            {c.visitors.cards.map((card, i) => (
              <div key={i} className={s.card}>
                <span className={s.tag}>{card.tag}</span>
                <h3 className={s.cardTitle}>{card.title}</h3>
                <PriceDisplay cardPrice={card.cardPrice} cashPrice={card.cashPrice} />
                <p className={s.description}>{card.description}</p>
                {card.badge && <span className={s.badge}>{card.badge}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Eternal Flame Memberships with Heroes Switcher */}
        <section className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>{c.eternalFlame.title}</h2>
          <p className={s.sectionSubtitle}>{c.eternalFlame.subtitle}</p>

          {/* Heroes & Wisdom Keepers Honor Callout Banner */}
          <div className={s.heroesBanner}>
            <div className={s.heroesLeft}>
              <div className={s.heroesBadgeHeader}>
                <Award size={20} />
                <h3>{c.heroesInfo.title}</h3>
              </div>
              <p>{c.heroesInfo.description}</p>
            </div>
            <div className={s.heroesRight}>
              <div className={s.groupChips}>
                {c.heroesInfo.groups.map((group, idx) => (
                  <span key={idx} className={s.chip}>
                    <ShieldCheck size={12} /> {group}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rate Selector Switcher */}
          <div className={s.toggleContainer}>
            <button 
              className={`${s.toggleBtn} ${rateType === 'standard' ? s.active : ''}`}
              onClick={() => setRateType('standard')}
            >
              Standard Rates
            </button>
            <button 
              className={`${s.toggleBtn} ${rateType === 'heroes' ? s.active : ''}`}
              onClick={() => setRateType('heroes')}
            >
              <Sparkles size={14} /> Heroes & Wisdom Keepers Rate
            </button>
          </div>

          {/* Eternal Flame Cards */}
          <div className={s.grid3}>
            {c.eternalFlame.plans.map((plan, i) => {
              const pricing = rateType === 'heroes' ? plan.heroes : plan.standard;
              return (
                <div key={i} className={`${s.card} ${plan.popular ? s.popularCard : ''}`}>
                  {plan.popular && <div className={s.popularRibbon}>Best Deal</div>}
                  <span className={s.tag}>{plan.tag}</span>
                  <h3 className={s.cardTitle}>{plan.title}</h3>
                  
                  {rateType === 'heroes' && (
                    <span className={s.heroRateIndicator}>
                      <ShieldCheck size={13} /> Heroes Discount Applied
                    </span>
                  )}

                  <PriceDisplay 
                    cardPrice={pricing.cardPrice} 
                    cashPrice={pricing.cashPrice} 
                    note={pricing.note} 
                  />

                  {plan.checklist && (
                    <ul className={s.checklist}>
                      {plan.checklist.map((item, idx) => (
                        <li key={idx}><Check size={14} /> {item}</li>
                      ))}
                    </ul>
                  )}

                  <p className={s.description}>{plan.description}</p>
                  {plan.badge && <span className={s.badge}>{plan.badge}</span>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Water Yoga Section */}
        <section className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>{c.waterYoga.title}</h2>
          <div className={s.grid3}>
            {c.waterYoga.cards.map((card, i) => (
              <div key={i} className={s.card}>
                <span className={s.tag}>{card.tag}</span>
                <h3 className={s.cardTitle}>{card.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Elders Section */}
        <section style={{ marginBottom: '60px' }}>
          <div className={s.elderBanner}>
            <div className={s.elderLeft}>
              <h3>{c.elderOfferings.title}</h3>
              <p>{c.elderOfferings.description}</p>
            </div>
            <div className={s.elderRight}>
              <span className={s.supporter}>{c.elderOfferings.sponsoredBy}</span>
            </div>
          </div>
        </section>

        {/* Special Events CTA */}
        <section>
          <div className={s.specialEventsCta}>
            <Link href="/special-events" className={s.specialEventsBtn}>
              View Special Events & Offerings <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className={s.splitGrid}>
          <div>
            <h4>{c.faqs.title}</h4>
            {c.faqs.list.map((faq, i) => (
              <div key={i} className={s.faqBlock}>
                <h5>{faq.icon} {faq.question}</h5>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}