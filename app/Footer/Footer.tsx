import styles from './Footer.module.scss';
import Link  from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <p>© 2023 - Made by <a href='https://twitter.com/SpaceBeetle1' target='_blank'>Hector Jimenez Cruz</a></p>
      <div className={styles.footerWrapper_contact}>
        <Link href='../contact'>About</Link>
      </div>
    </footer>
  )
}
