import './ModalInfoButton.scss';
import { useState, Fragment, useEffect } from "react";
import { ModalInfoButtonProps } from "@/types";


export default function ModalInfoButton ({index, image, isSmall=false, setClickedButton, clickedButton, isModalOpen}: ModalInfoButtonProps) {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [shouldRenderBubble, setShouldRenderBubble] = useState<boolean>(false);
  const isClicked = clickedButton === index;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setHoveredButton(null);
    if (isClicked) {
      setClickedButton(null);
      setHoveredButton(null);
    } else {
      setClickedButton(index);
      console.log('sep')
    }
  }
  const bubbleStyles = {
    fontWeight: '700',
  }

  useEffect(() => {
    if (hoveredButton === index || isClicked) {
      setShouldRenderBubble(true);
    } else {
      const timeoutId = setTimeout(() => {
        setShouldRenderBubble(false);
      }, 400); // match transition duration

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [hoveredButton, isClicked, index]);

  const className = 
    `bubbleText ${hoveredButton === index || isClicked ? '' : '-hide'}
    ${isSmall ? '-smallView' : ''} ${isModalOpen ? '-modalOpen': ''}`
  ;

  return (
      <Fragment>
          <button className='infoButton'
            onMouseEnter={() => setHoveredButton(index)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={handleClick}>
            i
          </button>
          {shouldRenderBubble && (
            <div className={className}>
              <p><span style={bubbleStyles}>Earth date:</span> {image.earth_date}</p>
              <p><span style={bubbleStyles}>Camera name:</span> {image.camera.name}</p>
              <p><span style={bubbleStyles}>Full name:</span> {image.camera.full_name}</p>
            </div>
          )}
      </Fragment>
  )
}
