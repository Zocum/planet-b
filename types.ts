export interface ImageData {
    id: number;
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
        
        photos: {
        sol: number;
        total_photos: number;
        cameras: string[];
        }[]
    }
}

export interface ModalInfoButtonProps {
    index: number;
    image: ImageData;
    isSmall: boolean;
    clickedButton: number | null;
    setClickedButton: (value: number | null) => void;
    isModalOpen: boolean;
}

export interface ModalProps {
    isModalOpen: boolean;
    currentImageIndex: number;
    images: ImageData[];
    setCurrentImageIndex: (value: (((prevState: number) => number) | number)) => void;
    setModalOpen: (value: boolean) => void;
    clickedButton: number | null;
    setClickedButton: (value: number | null) => void;
  }