import Image from "next/image";

const GalleryGridFour = ({
  photos,
  setIsOpenLightbox,
  setCurrentIndex,
}: {
  photos: string[];
  setIsOpenLightbox: (isOpen: boolean) => void;
  setCurrentIndex: (index: number) => void;
}) => {
  return (
    <div className="w-full h-full grid grid-cols-2 ">
      <div className="h-full flex overflow-hidden">
        <Image
          src={photos[0]}
          alt="product"
          className="w-full object-cover p-[1px] rounded-lg"
          width={1000}
          height={1500}
          onClick={() => {
            setIsOpenLightbox(true);
            setCurrentIndex(0);
          }}
        />
      </div>
      <div className="h-full overflow-hidden grid grid-cols-2 grid-rows-2">
        <div className="w-full h-full p-[1px]">
          <Image
            src={photos[1]}
            alt="product"
            className="w-full h-full object-cover p-[1px] rounded-lg"
            width={1000}
            height={1500}
            onClick={() => {
              setIsOpenLightbox(true);
              setCurrentIndex(1);
            }}
          />
          <Image
            src={photos[2]}
            alt="product"
            className="w-full h-full object-cover p-[1px] rounded-lg"
            width={1000}
            height={1500}
            onClick={() => {
              setIsOpenLightbox(true);
              setCurrentIndex(2);
            }}
          />
        </div>
        <div className="w-full h-full p-[1px]">
          <Image
            src={photos[3]}
            alt="product"
            className="w-full h-full object-cover p-[1px] rounded-lg"
            width={1000}
            height={1500}
            onClick={() => {
              setIsOpenLightbox(true);
              setCurrentIndex(3);
            }}
          />
          {photos[4] && (
            <Image
              src={photos[4]}
              alt="product"
              className="w-full h-full object-cover p-[1px] rounded-lg"
              width={1000}
              height={1500}
              onClick={() => {
                setIsOpenLightbox(true);
                setCurrentIndex(4);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryGridFour;
