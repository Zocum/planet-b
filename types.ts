import { ReactNode } from "react";

// Define base types
export interface HeaderProps {
    setRover: (value: string) => void;
}

export interface AccordionComponentProps {
    children: ReactNode;
}

export interface ImageData {
    id: number;
    sol: string;
    img_src: string;
    status: string;
    camera: {
      id: number;
      name: string;
      rover_id: number;
      full_name: string;
    };
    earth_date: string;
}

export interface RoverManifest {
    photo_manifest: {
        max_sol: number,
        landing_date: string,
        launch_date: string,
        name: string,
        status: string,
        photos: {
        sol: number;
        total_photos: number;
        cameras: string[];
        }[]
    }
}

export type ClickedButtonProps = {
    clickedButton: number | null;
    setClickedButton: (value: number | null) => void;
};

// Use base types to form new ones
export interface ModalInfoButtonProps extends ClickedButtonProps {
    index: number;
    image: ImageData;
    isSmall: boolean;
    isModalOpen: boolean;
}

export interface ModalProps extends ClickedButtonProps {
    isModalOpen: boolean;
    currentImageIndex: number;
    currentPage: number;
    maxPagesForCurrentSol: number;
    images: ImageData[];
    setCurrentImageIndex: (value: (((prevState: number) => number) | number)) => void;
    setModalOpen: (value: boolean) => void;
}
