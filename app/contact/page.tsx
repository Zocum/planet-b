import styles from './ContactPage.module.scss';
import Link from "next/link";
import texts from './texts.json';

export default function Contact() {

  return (
    <div className={styles.contactPage}>
      <header className={styles.contactPage_header}> 
        <h1>About</h1>
        <h2>
          <Link href="/">Back Home</Link>
        </h2>
      </header>
      <div className={styles.contactPage_body}>
        <h4 className={styles.contactPage_body_welcome}>{texts.welcome}</h4>
        <h3 className={styles.contactPage_body_sources}>{texts.sources}</h3>
        <h4 className={styles.contactPage_body_sourcesText}>
          {texts.sourcesText}
          <Link href={texts.sourcesLink.url}>{texts.sourcesLink.text}</Link></h4>
      </div>
    </div>
  );
};