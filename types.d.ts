import { ReactNode } from "react";

// Define base types
interface HeaderProps {
    setRover: (value: string) => void;
}

interface AccordionComponentProps {
    children: ReactNode;
    summaryRef: React.RefObject<HTMLElement>;
    contentRef: React.RefObject<HTMLDivElement>;
}

interface ImageData {
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

interface RoverManifest {
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

type ClickedButtonProps = {
    clickedButton: number | null;
    setClickedButton: (value: number | null) => void;
};

// Use base types to form new ones
interface ModalInfoButtonProps extends ClickedButtonProps {
    index: number;
    image: ImageData;
    isSmall: boolean;
    isModalOpen: boolean;
}

interface ModalProps extends ClickedButtonProps {
    isModalOpen: boolean;
    currentImageIndex: number;
    currentPage: number;
    maxPagesForCurrentSol: number;
    images: ImageData[];
    messageOpen: boolean;
    setMessageOpen: (value: boolean) => void;
    setCurrentImageIndex: (value: (((prevState: number) => number) | number)) => void;
    setCurrentPage: (value: (((prevState: number) => number) | number)) => void;
    setModalOpen: (value: boolean) => void;
}
