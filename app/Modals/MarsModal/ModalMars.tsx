import Image from 'next/image';
import styles from './ModalMars.module.scss';
import { useEffect, useRef, useState } from 'react';
import ModalInfoButton from '../ModalsInfoButton/ModalInfoButton';
import { ModalProps} from '@/types';


export default function MarsModal({
  clickedButton,
  setClickedButton,
  isModalOpen, 
  currentImageIndex,
  currentPage,
  maxPagesForCurrentSol, 
  images,
  messageOpen,
  setMessageOpen, 
  setCurrentImageIndex,
  setCurrentPage,
  setModalOpen
}: ModalProps) {
    const [startX, setStartX] = useState(0);
    const [distanceX, setDistanceX] = useState(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fMessageRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [modalWidth, setModalWidth] = useState<number>(600);

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        if (imageRef.current) {
          imageRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const increaseSize = () => {
      if (imageRef.current) {
        if (modalWidth < 900) {
          setModalWidth(modalWidth => modalWidth + 100);
        } else {
          toggleFullScreen();
        }
      }
    };

    const decreaseSize = () => {
      if (imageRef.current && modalWidth > 600) {
        setModalWidth(modalWidth => modalWidth - 100);
      }
    };
  
    const handleTouchStart = (e: React.TouchEvent) => {
      setStartX(e.touches[0].clientX);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setDistanceX(e.touches[0].clientX - startX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      setDistanceX(e.clientX - startX);
    };
  
    const handleTouchEnd = () => {
      if (distanceX > 30) {
        setCurrentImageIndex(old => Math.max(0, old - 1)); // Swipe Right - previous image
      } else if (distanceX < -30) {
        setCurrentImageIndex(old => Math.min(images.length - 1, old + 1)); // Swipe Left - next image
      }
  
      // Reset values
      setStartX(0);
      setDistanceX(0);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;

      if (distanceX > 50) {
        setCurrentImageIndex(old => Math.max(0, old - 1)); // Swipe Right - previous image
      } else if (distanceX < -50) {
        setCurrentImageIndex(old => Math.min(images.length - 1, old + 1)); // Swipe Left - next image
      }
  
      // Reset values
      setStartX(0);
      setDistanceX(0);
      setIsDragging(false);
    };

    const lastImage = currentImageIndex === images.length - 1;
   
    useEffect(() => {
      if (currentImageIndex === images.length - 1) {
        setMessageOpen(true);
      }
    }, [lastImage]);

    const closeMessage = () => {
      const currentfMessage = fMessageRef.current;
        (currentfMessage as HTMLDivElement).animate([
          { transform: 'scale(1)'},
          { transform: 'scale(0)'},
        ], {
          duration: 400,
          easing: 'ease'
        });

      setTimeout(() => {
        setMessageOpen(false);
      }, 380);
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
            onMouseDown={(e) => e.preventDefault()}
            disabled={currentImageIndex === 0}
          >
            {'<'}
          </button>
        </div>
        <div className={styles.modal} 
             onClick={(e) => e.stopPropagation()}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             style={{width: `${modalWidth}px`}}
             >
          <ModalInfoButton index={currentImageIndex} image={images[currentImageIndex]} isSmall={false} setClickedButton={setClickedButton} clickedButton={clickedButton} isModalOpen={isModalOpen}/>
          <Image 
            className={styles.modal_image} 
            src={images[currentImageIndex].img_src} 
            alt="NASA Mars Rover Image" 
            width={400}
            height={400}
            layout='responsive' 
            onDragStart={e => e.preventDefault()}
            ref={imageRef}
          />
          <div className={styles.closeButtonWrapper}>
            <button className={styles.closeModal} onClick={() => setModalOpen(false)}>X</button>
            <button onClick={toggleFullScreen} className={styles.toggleFullScreen}>Full</button>
            <button onClick={increaseSize} className={styles.increaseSize}>+</button>
            <button onClick={decreaseSize} className={styles.decreaseSize} disabled={modalWidth === 600}>-</button>
            { lastImage 
              ? ( 
                  <div className={styles.pageButtons}>
                    <button className={styles.nextPage} disabled={currentPage === maxPagesForCurrentSol} onClick={() => {
                      setCurrentPage((old: number) => Math.max(old + 1, 1));
                      setCurrentImageIndex(0);
                    }}><span>Next Page</span></button>
                    <button className={styles.previousPage} disabled={currentPage === 1} onClick={() => {
                      setCurrentPage((old: number) => Math.max(old -1, 1));
                      setCurrentImageIndex(0);
                    }}><span>Previous Page</span></button>
                  </div>
                ) 
              : null 
            }
          </div>
          { messageOpen ? 
            (
              <div ref={fMessageRef} className={`${styles.finalMessage} ${(currentPage === maxPagesForCurrentSol && currentImageIndex === images.length -1) ? styles.appear : ''}`}>
                <button className={styles.closeMessage} onClick={() => closeMessage()}><span>X</span></button>
                <span>Enough images for today...or &apos;tosol&apos;? <p>Go check out another Sol!</p></span>
              </div>
            ) : null 
          }
        </div>
        <div>
          <button 
            className={styles.buttonNext}
            onClick={() => setCurrentImageIndex(old => Math.min(images.length - 1, old + 1))}
            onMouseDown={(e) => e.preventDefault()}
            disabled={currentImageIndex === images.length - 1}
          >
            {'>'}
          </button>
        </div>
      </div>
    ) : null
  )
}
  