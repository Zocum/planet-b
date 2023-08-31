
import Link from "next/link";

export default function Contact() {
  const styles = { color: 'red' };
  return (
    <>
    <h1 style={styles}>First Post</h1>
    <h2>
      <Link href="/" style={styles}>Back to home</Link>
    </h2>
    </>
  );
};