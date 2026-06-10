import React from 'react';
import Hero from "@/components/Hero/Hero";
import { Check, HelpCircle, CreditCard, Heart, Calendar } from 'lucide-react';
import s from "./Memberships.module.scss";

const heroSrc = "https://admin.lightworkerranch.com/wp-content/uploads/2026/05/IMG_1176.jpg";

const MEMBERSHIPS_CONTENT = {
  hero: { title: "Rates & Memberships", subtitle: '"You are the light of the world... let your light shine before others..." — Matthew 5:14-16', bgImage: heroSrc },
  visitors: {
    title: "Visitors of the Light",
    cards: [
      { tag: "Single Session", title: "Class Drop-In", cardPrice: "$15.60", cashPrice: "$15", description: "Join any standard yoga or movement class." },
      { tag: "Healing Experience", title: "Sacred Sound Journey", cardPrice: "$26.00", cashPrice: "$25", description: "A deep meditative sound immersion for the soul." },
      { tag: "Package", title: "Rising Star Punch Card", cardPrice: "$135.20", cashPrice: "$130", description: "10 classes. Journey ends 3 months from purchase.", badge: "Complete the journey and the 11th Class is free!" }
    ]
  },
  eternalFlame: {
    title: "Eternal Flame Memberships",
    cards: [
      { tag: "Premium Commitment", title: "Full Membership", cardPrice: "$124.80", cashPrice: "$120", period: "/ month", checklist: ["Unlimited Classes", "1 Sound Journey per month", "Unlimited Sauna & Cave Shower", "Greenhouse Privileges & Free Ice"] },
      { tag: "Cash Discount", title: "Cash Membership", cardPrice: "$124.80", cashPrice: "$120", period: "/ month", description: "Save $4 every month when paying with Cash or Check." },
      { tag: "Limited Time", title: "Soft Opening Special", cardPrice: "$104.00", cashPrice: "$100", period: "/ month", description: "June 15th through the week of Grand Opening Only!", badge: "$100 Grand Opening Special" }
    ]
  },
  waterYoga: {
    title: "Water Yoga",
    cards: [
      { tag: "Community Offering", title: "Sizzling Seniors Free Water Wellness", cardPrice: "Free", cashPrice: "Free", period: "/ Thursdays 10:30am", checklist: ["Thanks to local light sponsors", "First Class June 4th", "Quitman City Pool"] },
      { tag: "Drop-In", title: "Lands Zen Water Yoga Drop-In", cardPrice: "$20.80", cashPrice: "$20", period: "/ Drop-In", description: "The Links at Lands End Pool, 285 Private Road 5980 Yantis, TX", checklist: ["Tuesdays 10:30 A.M.", "The Links at Lands End Pool"] },
      { tag: "Series Deal", title: "10 Week Series at Lands Zen Water Yoga", cardPrice: "$124.80", cashPrice: "$120", period: "/ 10 Week Series", description: "The Links at Lands End Pool, 285 Private Road 5980 Yantis, TX", checklist: ["Series Special in session.", "Tuesdays 10:30 A.M.", "Rain outs made up", "New Series special coming in August"] }
    ]
  },
  elderOfferings: {
    title: "Silver Sage Light Offerings for Elders - $5 Suggested Contribution",
    description: "Monday, Wednesday & some Fridays at 2 PM. Specifically curated for our elder community members.",
    pills: [{ text: "Suggested Heart-Centered Contribution: $5", isOrange: true }, { text: "Free Community Offerings Available", isOrange: false }],
    sponsoredBy: "Local Light Supporters"
  },
  amenities: {
    title: "Single Amenities",
    name: "Hot Rock Sauna & Cave Shower Pass",
    subtext: "Included for Eternal Flame Members",
    cardPrice: "$5.20",
    cashPrice: "$5",
    notice: "Custom Hot Rock Sauna build coming soon — October 2026"
  },
  faqs: {
    title: "Common Questions",
    list: [
      { icon: <HelpCircle size={18} />, question: "How do I register?", answer: "Just arrive 15-20 minutes early." },
      { icon: <CreditCard size={18} />, question: "How do I pay?", answer: "We accept Credit Card, Venmo, Check, and Cash." },
      { icon: <Heart size={18} />, question: "Bring anything?", answer: "An open heart." }
    ]
  }
};

export default function MembershipsRatesPage() {
  const c = MEMBERSHIPS_CONTENT;

  const PriceDisplay = ({ cardPrice, cashPrice }: { cardPrice: string, cashPrice: string }) => (
    <div className={s.priceWrapper}>
      <div className={s.priceComparison}>
        {cardPrice === "Free" ? (
          <span className={s.priceCash}>Free</span>
        ) : (
          <>
            <div className={s.priceBlock}>
              <span className={s.priceValue}>{cardPrice}</span>
              <span className={s.priceLabel}>Card</span>
            </div>
            <span className={s.separator}>/</span>
            <div className={s.priceBlock}>
              <span className={s.priceValueCash}>{cashPrice}</span>
              <span className={s.priceLabelCash}>Cash</span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={s.pageWrapper}>
      <Hero title={c.hero.title} subtitle={c.hero.subtitle} bgImage={c.hero.bgImage} buttonText={''} />
      <div className={s.contentContainer}>
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

        <section className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>{c.eternalFlame.title}</h2>
          <div className={s.grid3}>
            {c.eternalFlame.cards.map((card, i) => (
              <div key={i} className={s.card}>
                <span className={s.tag}>{card.tag}</span>
                <h3 className={s.cardTitle}>{card.title}</h3>
                <PriceDisplay cardPrice={card.cardPrice} cashPrice={card.cashPrice} />
                {card.checklist && <ul className={s.checklist}>{card.checklist.map((item, idx) => <li key={idx}><Check size={14} /> {item}</li>)}</ul>}
                {card.description && <p className={s.description}>{card.description}</p>}
                {card.badge && <span className={s.badge}>{card.badge}</span>}
              </div>
            ))}
          </div>
        </section>

        <section className={s.sectionCenter}>
          <h2 className={s.sectionTitle}>{c.waterYoga.title}</h2>
          <div className={s.grid3}>
            {c.waterYoga.cards.map((card, i) => (
              <div key={i} className={s.card}>
                <span className={s.tag}>{card.tag}</span>
                <h3 className={s.cardTitle}>{card.title}</h3>
                <PriceDisplay cardPrice={card.cardPrice} cashPrice={card.cashPrice} />
                {card.checklist && <ul className={s.checklist}>{card.checklist.map((item, idx) => <li key={idx}><Check size={14} /> {item}</li>)}</ul>}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <div className={s.elderBanner}>
            <div className={s.elderLeft}>
              <h3>{c.elderOfferings.title}</h3>
              <p>{c.elderOfferings.description}</p>
            </div>
            <div className={s.elderRight}><span className={s.sponsored}>Sponsored By</span><span className={s.supporter}>{c.elderOfferings.sponsoredBy}</span></div>
          </div>
        </section>

        <section className={s.splitGrid}>
          <div>
            <h4>{c.amenities.title}</h4>
            <div className={s.amenityRow}>
              <div><h5>{c.amenities.name}</h5><p>{c.amenities.subtext}</p></div>
              <PriceDisplay cardPrice={c.amenities.cardPrice} cashPrice={c.amenities.cashPrice} />
            </div>
            <div className={s.noticeBar}><Calendar size={16} /> <p>{c.amenities.notice}</p></div>
          </div>
          <div>
            <h4>{c.faqs.title}</h4>
            {c.faqs.list.map((faq, i) => <div key={i} className={s.faqBlock}><h5>{faq.icon} {faq.question}</h5><p>{faq.answer}</p></div>)}
          </div>
        </section>
      </div>
    </div>
  );
}