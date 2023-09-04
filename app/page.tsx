'use client';
import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import MarsModal from './Modals/MarsModal/ModalMars';
import ModalInfoButton from './Modals/ModalsInfoButton/ModalInfoButton';
import { RoverManifest, ImageData } from '@/types';
import Header from './Header/Header';
import Footer from './Footer/Footer';

async function fetchRoverManifest(rover: string): Promise<RoverManifest['photo_manifest']> {
  const API_KEY = 'vTvXej37nbIqMhzi3GwjmXSi1IJpfLqeKl6r7zWa'; // Replace with your API key
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.photo_manifest;
}

async function fetchImages(sol: number, page: number, rover: string): Promise<ImageData[]> {
  const API_KEY = 'vTvXej37nbIqMhzi3GwjmXSi1IJpfLqeKl6r7zWa'; 
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=${API_KEY}`);
  
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
  const [manifestPhotos, setManifestPhotos] = useState<RoverManifest['photo_manifest'] | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [rover, setRover] = useState<string>('perseverance');
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchRoverManifest(rover)
      .then(photo_manifest => {
        setManifestPhotos(photo_manifest);
        const maxSol = photo_manifest.photos[photo_manifest.photos.length - 1].sol;
        setCurrentSol(maxSol);
        setMaxSol(maxSol);
      })
      .catch(console.error);
  }, [rover, setMaxSol]);

  useEffect(() => {
    if (currentSol !== null) {
      fetchImages(currentSol, currentPage, rover)
        .then(setImages)
        .catch(console.error);
    }
  }, [currentSol, currentPage, rover]);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      setMessageOpen(true);
    } else {
      document.documentElement.style.overflow = 'unset';
      setMessageOpen(false);
    }
  
    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // console.log(images);
  const imagesPerPage = 25;
  const totalPhotosForCurrentSol = manifestPhotos ? manifestPhotos.photos.find(photo => photo.sol === currentSol)?.total_photos ?? 0 : 0;
  const maxPagesForCurrentSol = Math.ceil(totalPhotosForCurrentSol / imagesPerPage);
  const roverName = manifestPhotos ? manifestPhotos.name : '';
  const roverStatus = manifestPhotos ? manifestPhotos.status : '';
  const statusStyle = {
    fontSize: '20px;',
    color: 'whitesmoke'
  }

  const openModal = (index: number) => {
    setModalOpen(true);
    setCurrentImageIndex(index);
  }

  return (
    <Fragment> 
      <Header setRover={setRover}/>
      <main className={styles.main}>
        <a className={styles.main_logo} href='/'>
            <Image src='/logo.png' width={50} height={50} alt='Logo Planet B' layout='responsive'/>
            <p className={styles.main_logo_text}>Martian Gallery</p>
        </a>
        <h1 className={styles.title}>{roverName} Images <p style={statusStyle}>Rover Status: {roverStatus.charAt(0).toUpperCase() + roverStatus.slice(1)}</p></h1>
        <h2 className={styles.subtitle}>Currently viewing:</h2>
        <div className={styles.solButtons}>
          <div>
            <button className={styles.solButtons_prev} onClick={() => {
              setCurrentSol((old: number | null) => Math.max((old ?? 1) - 1, 1));
              setCurrentPage(1);}}>
              Previous
            </button>
          </div>
          <h1 className={styles.subtitle_sol}>Sol {currentSol}</h1>
          <div>
            <button className={currentSol === maxSol ? styles.solButtons_next_disabled : styles.solButtons_next} 
            onClick={() => {
              setCurrentSol((old: number | null) => (old ?? 1) + 1);
              setCurrentPage(1);
            }} disabled={currentSol === maxSol}>
              Next
            </button>
          </div>
        </div>

        <div className={styles.pageButtons}>
          <button className={currentPage === 1 ? styles.pageButtons_prev_disabled : styles.pageButtons_prev} onClick={() => setCurrentPage((old: number) => Math.max(old - 1, 1))}
          disabled={currentPage === 1}>
            Previous Page
          </button>
          <div className={styles.pageText}>
            <h4 className={styles.pageNumber}>Page {currentPage} of {maxPagesForCurrentSol}</h4>
            <h3 className={styles.photoNumber}>{images.length} items of {totalPhotosForCurrentSol}</h3>
          </div>
          <button className={currentPage === maxPagesForCurrentSol ? styles.pageButtons_next_disabled : styles.pageButtons_next} onClick={() => setCurrentPage((old: number) => Math.max(old + 1, 1))}
            disabled={currentPage === maxPagesForCurrentSol}>
            Next Page
          </button>
        </div>

        <div className={styles.grid}>
          {images.map((image, index) => (
            <div tabIndex={0} key={image.id} className={styles.card} 
              onClick={() => openModal(index)}
              onMouseLeave={() => {setClickedButton(null)}
              }>
              <ModalInfoButton index={index} image={image} isSmall={true} setClickedButton={setClickedButton} clickedButton={clickedButton} isModalOpen={isModalOpen}/>
              <Image className={styles.image} src={image.img_src} alt="NASA Mars Rover Image" width={180} height={180} layout='responsive'/>
            </div>
          ))}
        </div>
        <MarsModal 
          clickedButton={clickedButton}
          setClickedButton={setClickedButton}
          isModalOpen={isModalOpen}
          currentImageIndex={currentImageIndex}
          currentPage={currentPage}
          maxPagesForCurrentSol={maxPagesForCurrentSol}
          images={images}
          messageOpen={messageOpen}
          setMessageOpen={setMessageOpen}
          setCurrentImageIndex={setCurrentImageIndex}
          setCurrentPage={setCurrentPage}
          setModalOpen={setModalOpen}
        />
      </main>
      <Footer/>
    </Fragment>
  );
};
