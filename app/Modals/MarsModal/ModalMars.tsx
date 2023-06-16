import Image from 'next/image';
import styles from './ModalMars.module.scss';
import { useState } from 'react';
import { ImageData } from '@/types';
import ModalInfoButton from '../ModalsInfoButton/ModalInfoButton';
import { ModalProps} from '@/types';


export default function MarsModal({
  clickedButton,
  setClickedButton,
  isModalOpen, 
  currentImageIndex, 
  images, 
  setCurrentImageIndex,
  setModalOpen
}: ModalProps) {
    const [startX, setStartX] = useState(0);
    const [distanceX, setDistanceX] = useState(0);
  
    const handleTouchStart = (e: React.TouchEvent) => {
      setStartX(e.touches[0].clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setDistanceX(e.touches[0].clientX - startX);
    };
  
    const handleTouchEnd = () => {
      if (distanceX > 50) {
        setCurrentImageIndex(old => Math.max(0, old - 1)); // Swipe Right - previous image
      } else if (distanceX < -50) {
        setCurrentImageIndex(old => Math.min(images.length - 1, old + 1)); // Swipe Left - next image
      }
  
      // Reset values
      setStartX(0);
      setDistanceX(0);
    };

  return (
    isModalOpen ? (
      <div className={`${styles.modalOverlay}`} onClick={(e) => {
        if (e.target === e.currentTarget) setModalOpen(false);
      }}>
        <div>
          <button 
            className={`${styles.buttonPrev}`}
            onClick={() => setCurrentImageIndex(old => Math.max(0, old - 1))}
            disabled={currentImageIndex === 0}
          >
            {'<'}
          </button>
        </div>
        <div className={styles.modal} 
             onClick={(e) => e.stopPropagation()}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}>
          <ModalInfoButton index={currentImageIndex} image={images[currentImageIndex]} isSmall={false} setClickedButton={setClickedButton} clickedButton={clickedButton} isModalOpen={isModalOpen}/>
          <Image 
            className={styles.modal_image} 
            src={images[currentImageIndex].img_src} 
            alt="NASA Mars Rover Image" 
            width={400}
            height={400}
            layout='responsive' 
          />
          <div className={styles.closeButtonWrapper}>
            <button className={styles.closeModal} onClick={() => setModalOpen(false)}>X</button>
          </div>
        </div>
        <div>
          <button 
            className={styles.buttonNext}
            onClick={() => setCurrentImageIndex(old => Math.min(images.length - 1, old + 1))}
            disabled={currentImageIndex === images.length - 1}
          >
            {'>'}
          </button>
        </div>
      </div>
    ) : null
  )
}
  