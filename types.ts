export interface ImageData {
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