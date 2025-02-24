import Image from "next/image";

const GalleryGridTwo = ({ photos, setIsOpenLightbox, setCurrentIndex }: { photos: string[], setIsOpenLightbox: (isOpen: boolean) => void, setCurrentIndex: (index: number) => void }) => {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-1">
      <div className="h-full flex overflow-hidden rounded-lg">
        <Image
          src={photos[0]}
          alt="photo 1"
          className="w-full h-full object-cover cursor-pointer"
          width={1000}
          height={1500}
          onClick={() => {
            setIsOpenLightbox(true);
            setCurrentIndex(0);
          }}
        />
      </div>
      <div className="h-full flex overflow-hidden rounded-lg">
        {photos[1] && (
          <Image
            src={photos[1]}
            alt="photo 2"
            className="w-full h-full object-cover cursor-pointer"
            width={1000}
            height={1500}
            onClick={() => {
              setIsOpenLightbox(true);
              setCurrentIndex(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GalleryGridTwo;
