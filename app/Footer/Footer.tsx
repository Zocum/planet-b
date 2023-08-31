import styles from './Footer.module.scss';
import Link  from 'next/link';

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <Link href='../contact'>Contact</Link></div>
  )
}
