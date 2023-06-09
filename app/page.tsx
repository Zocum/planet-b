'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';

interface ImageData {
  img_src: string;
}

async function fetchImages(sol: number, page: number): Promise<ImageData[]> {
  const API_KEY = 'vTvXej37nbIqMhzi3GwjmXSi1IJpfLqeKl6r7zWa'; // Replace with your API key
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.photos;
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentSol, setCurrentSol] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchImages(currentSol, currentPage).then(setImages).catch(console.error);
  }, [currentSol, currentPage]);
   console.log(images);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mars Rover Images</h1>
      <h2>Currently viewing Sol {currentSol}</h2>

      <div className={styles.grid}>
        {images.map((image, index) => (
          <div key={index} className={styles.card}>
            <Image src={image.img_src} alt="NASA Mars Rover Image" width={180} height={180} layout="responsive" />
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => setCurrentSol((old) => Math.max(old - 1, 1))}>
          Previous Sol
        </button>
        <button onClick={() => setCurrentSol((old) => old + 1)}>
          Next Sol
        </button>
      </div>
      <div>
        <button onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}>
          Previous Page
        </button>
        <button onClick={() => setCurrentPage((old) => old + 1)}>
          Next Page
        </button>
      </div>
    </main>
  );
}
