'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';

interface ImageData {
  img_src: string;
}
interface RoverManifest {
  photo_manifest: {
    max_sol: number,
    photos: {
      sol: number;
      total_photos: number;
      cameras: string[];
    }[]
  }
}


async function fetchRoverManifest(): Promise<RoverManifest['photo_manifest']['photos']> {
  const API_KEY = 'vTvXej37nbIqMhzi3GwjmXSi1IJpfLqeKl6r7zWa'; // Replace with your API key
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.photo_manifest.photos;
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
  const [maxSol, setMaxSol] = useState<number | null>(null);
  const [manifestPhotos, setManifestPhotos] = useState<RoverManifest['photo_manifest']['photos']>([]);
  const [displayedImages, setDisplayedImages] = useState(0);

  useEffect(() => {
    fetchRoverManifest()
      .then(photos => {
        setManifestPhotos(photos);
        const maxSol = photos[photos.length - 1].sol;
        setCurrentSol(maxSol);
        setMaxSol(maxSol);
      })
      .catch(console.error);
  }, [setMaxSol]);

  useEffect(() => {
    if (currentSol !== null) {
      fetchImages(currentSol, currentPage)
        .then((fetchedImages) => {
          const imagesToDisplay = fetchedImages.slice(0, 16);
          setImages(fetchedImages);
          setDisplayedImages(imagesToDisplay.length);
        })
        .catch(console.error);
    }
  }, [currentSol, currentPage]);

  console.log(images);

  const totalPhotosForCurrentSol = manifestPhotos.find(photo => photo.sol === currentSol)?.total_photos || 0;
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mars Curiosity Images</h1>
      <h2 className={styles.subtitle}>Currently viewing:</h2>
      <div className={styles.solButtons}>
        <button className={styles.solButtons_prev} onClick={() => setCurrentSol((old: number | null) => Math.max((old || 1) - 1, 1))}>
          Previous
        </button>
        <h1 className={styles.subtitle_sol}>Sol {currentSol}</h1>
        <button className={currentSol === maxSol ? styles.solButtons_next_disabled : styles.solButtons_next} 
         onClick={() => setCurrentSol((old: number | null) => (old || 1) + 1)}
         disabled={currentSol === maxSol}>
          Next
        </button>
      </div>

      <div className={styles.pageButtons}>
        <button className={styles.pageButtons_prev} onClick={() => setCurrentPage((old: number) => Math.max(old - 1, 1))}>
          Previous Page
        </button>
        <h3 className={styles.photoNumber}>{images.length} items of {totalPhotosForCurrentSol}</h3>
        <button className={styles.pageButtons_next} onClick={() => setCurrentPage((old: number) => Math.max(old - 1, 1))}>
          Next Page
        </button>
      </div>

      <div className={styles.grid}>
        {images.map((image, index) => (
          <div key={index} className={styles.card}>
            <Image className={styles.image} src={image.img_src} alt="NASA Mars Rover Image" width={180} height={180} layout='responsive' />
          </div>
        ))}
      </div>

    </main>
  );
}
