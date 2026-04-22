import Link from "next/link";
import styles from "./Navigation.module.css";

// We're turning this into a simple component that doesn't 
// crash the build if WordPress is missing a menu.
export default async function Navigation() {
  
  // For now, we'll use a hardcoded menu so your site can deploy.
  // Once the site is live, we can reconnect this to WordPress properly.
  const manualNavItems = [
    { label: "Home", uri: "/" },
  ];

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      {manualNavItems.map((item, index) => (
        <Link
          itemProp="url"
          href={item.uri}
          key={index}
        >
          <span itemProp="name">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}