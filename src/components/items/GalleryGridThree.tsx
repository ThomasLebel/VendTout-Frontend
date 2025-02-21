import Image from "next/image";

const GalleryGridThree = ({ photos }: { photos: string[] }) => {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 ">
      <div className="w-full row-span-2 p-[1px] flex overflow-hidden">
        <Image
          src={photos[0]}
          alt="product"
          className="w-full h-full object-cover "
          width={1000}
          height={1500}
        />
      </div>
      <div className="w-full h-full p-[1px] flex overflow-hidden">
        <Image
          src={photos[1]}
          alt="product"
          className="w-full h-full object-cover "
          width={1000}
          height={1500}
        />
      </div>
      <div className="w-full h-full  p-[1px] flex overflow-hidden">
        <Image
          src={photos[2]}
          alt="product"
          className="w-full h-full object-cover "
          width={1000}
          height={1500}
        />
      </div>
    </div>
  );
};

export default GalleryGridThree;
