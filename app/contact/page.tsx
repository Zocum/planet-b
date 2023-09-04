
import Link from "next/link";

export default function Contact() {
  const styles = { 
    color: 'whitesmoke',
    margin: '1rem calc(6rem + 40px) 2rem calc(6rem + 40px)',
 };

 const headerStyles = {
  color: 'whitesmoke',
  margin: '1rem calc(6rem + 40px) 2rem calc(6rem + 40px)',
  display: 'flex',
  justifyContent: 'space-between',
 };

  return (
    <>
    <header style={headerStyles}> 
    <h1>About</h1>
    <h2>
      <Link href="/">Back Home</Link>
    </h2></header>
   
    <h4 style={styles}>Welcome to our Martian Gallery, where we bring the fascinating visuals of the Martian surface directly to your screen. Our portal serves as a gateway to experience the Martian environment through the lenses of NASA's Mars rovers.</h4>
    <br />
    <h3 style={styles}>Source of Our Images</h3>
    <br />
    <h4 style={styles}>The images exhibited on our gallery are sourced directly from NASA's Mars Rover Photos API. We value transparency and wish to acknowledge NASA's significant contribution to the realization of this project.</h4>
    </>
  );
};