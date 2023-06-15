import './ModalInfoButton.scss';
import { useState } from "react";
import { ImageData } from "@/types";
import { Fragment } from "react";

interface ModalInfoButtonProps {
  index: number;
  image: ImageData;
}

export default function ModalInfoButton ({index, image}: ModalInfoButtonProps) {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const bubbleStyles = {
      fontWeight: '700',
    }

    return (
        <Fragment>
            <button className='infoButton'
              onMouseEnter={() => setHoveredButton(index)}
              onMouseLeave={() => setHoveredButton(null)}>
              i
            </button>
            {hoveredButton === index && (
              <div className='bubbleText'>
                <p><span style={bubbleStyles}>Earth date:</span> {image.earth_date}</p>
                <p><span style={bubbleStyles}>Camera name:</span> {image.camera.name}</p>
                <p><span style={bubbleStyles}>Full name:</span> {image.camera.full_name}</p>
              </div>
            )}
        </Fragment>
    )
}