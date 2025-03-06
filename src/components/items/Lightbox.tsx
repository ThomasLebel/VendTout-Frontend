import Image from "next/image";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Lightbox = ({
  photos,
  currentIndex,
  setIsOpenLightbox,
  setCurrentIndex,
}: {
  photos: string[];
  isOpenLightbox: boolean;
  currentIndex: number;
  setIsOpenLightbox: (isOpen: boolean) => void;
  setCurrentIndex: (index: number) => void;
}) => {

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(photos.length - 1);
    }
  };

  const handeBackGroundClick = () => {
    setIsOpenLightbox(false);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };


  return (
    <>
      {/* Background */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-20" onClick={handeBackGroundClick}>
        {/* Container */}
        <div className="flex justify-center items-center h-full">
          {/* Image */}
          <div className="bg-white rounded-lg h-3/4 relative" onClick={handleImageClick}>
            <Image
              src={photos[currentIndex]}
              alt="Photo du produit"
              className="w-full h-full object-cover rounded-lg select-none"
              width={1000}
              height={1500}
            />
            {/* Bouton fermer */}
            <div
              className=" w-8 h-8 bg-black/50 rounded-full absolute top-4 right-4 flex justify-center items-center"
              onClick={() => setIsOpenLightbox(false)}
            >
              <XMarkIcon className="w-5 h-5 text-white/70 hover:text-white transition-all duration-300" />
            </div>
            {/* Bouton suivant */}
            <div className=" w-8 h-8 bg-black/50 rounded-full absolute top-[50%] right-4 flex justify-center items-center" onClick={handleNext}>
              <ChevronRightIcon className="w-5 h-5 text-white/70 hover:text-white transition-all duration-300" />
            </div>
            {/* Bouton précédent */}
            <div className=" w-8 h-8 bg-black/50 rounded-full absolute top-[50%] left-4 flex justify-center items-center" onClick={handlePrevious}>
              <ChevronLeftIcon className="w-5 h-5 text-white/70 hover:text-white transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lightbox;
