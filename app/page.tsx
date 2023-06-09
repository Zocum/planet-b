'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';

interface ImageData {
  img_src: string;
}

interface RoverManifest {
  photo_manifest: {
    max_sol: number;
  }
}

async function fetchRoverManifest(): Promise<RoverManifest> {
  const API_KEY = 'vTvXej37nbIqMhzi3GwjmXSi1IJpfLqeKl6r7zWa'; // Replace with your API key
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
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
  const [currentSol, setCurrentSol] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRoverManifest()
    .then(manifest => setCurrentSol(manifest.photo_manifest.max_sol))
    .catch(console.error);
  }, [])

  useEffect(() => {
    if (currentSol !== null) {
      fetchImages(currentSol, currentPage).then(setImages).catch(console.error);
    }
  }, [currentSol, currentPage]);
   console.log(images);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mars Curiosity Images</h1>
      <h2 className={styles.subtitle}>Currently viewing <p className={styles.subtitle_sol}>Sol {currentSol}</p></h2>

      <div className={styles.grid}>
        {images.slice(0, 16).map((image, index) => (
          <div key={index} className={styles.card}>
            <Image className={styles.image} src={image.img_src} alt="NASA Mars Rover Image" width={180} height={180} layout='responsive' />
          </div>
        ))}
      </div>

      <div className={styles.solButtons}>
        <button onClick={() => setCurrentSol((old: number | null) => Math.max(old || 1 - 1, 1))}>
          Previous Sol
        </button>
        <button onClick={() => setCurrentSol((old: number | null) => (old || 1) + 1)}>
          Next Sol
        </button>
      </div>
      <div className={styles.pageButtons}>
        <button onClick={() => setCurrentPage((old: number) => Math.max(old - 1, 1))}>
          Previous Page
        </button>
        <button onClick={() => setCurrentPage((old: number) => old + 1)}>
          Next Page
        </button>
      </div>
    </main>
  );
}
