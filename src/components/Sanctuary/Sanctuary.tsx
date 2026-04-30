import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Sanctuary.module.scss';

interface SanctuaryProps {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const Sanctuary = ({ title, subtitle, address, phone, email, hours }: SanctuaryProps) => {
  // Encodes the address for the Google Maps Embed URL
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.sanctuary}>
      <div className="container">
        <div className={styles.header}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.info}>
            {/* Location */}
            <div className={styles.item}>
              <div className={styles.iconBox}>
                <MapPin color="white" size={20} strokeWidth={2} />
              </div>
              <div>
                <strong>Location</strong>
                <p>{address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className={styles.item}>
              <div className={styles.iconBox}>
                <Phone color="white" size={20} strokeWidth={2} />
              </div>
              <div>
                <strong>Phone</strong>
                <p>{phone}</p>
              </div>
            </div>

            {/* Email */}
            <div className={styles.item}>
              <div className={styles.iconBox}>
                <Mail color="white" size={20} strokeWidth={2} />
              </div>
              <div>
                <strong>Email</strong>
                <p>{email}</p>
              </div>
            </div>

            {/* Hours */}
            <div className={styles.item}>
              <div className={styles.iconBox}>
                <Clock color="white" size={20} strokeWidth={2} />
              </div>
              <div>
                <strong>Hours</strong>
                <p className={styles.hoursText}>{hours}</p>
              </div>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            {address ? (
              <iframe
                title="Sanctuary Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
              ></iframe>
            ) : (
              <div className={styles.mapPlaceholder}>
                <p>Enter an address in WP to display the map</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sanctuary;