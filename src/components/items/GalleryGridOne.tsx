import Image from "next/image";

const GalleryGridTwo = ({ photos, setIsOpenLightbox, setCurrentIndex }: { photos: string[], setIsOpenLightbox: (isOpen: boolean) => void, setCurrentIndex: (index: number) => void }) => {
  return (
    <div className="w-full h-full gap-1 rounded-lg overflow-hidden">

        <Image
          src={photos[0]}
          alt="photo 1"
          className="w-full h-full object-cover cursor-pointer bg-darkGrey bg-opacity-20"
          width={1000}
          height={1500}
          onClick={() => {
            setIsOpenLightbox(true);
            setCurrentIndex(0);
          }}
        />

      
    </div>
  );
};

export default GalleryGridTwo;
