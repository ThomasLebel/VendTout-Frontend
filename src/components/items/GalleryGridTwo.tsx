import Image from "next/image";

const GalleryGridTwo = ({ photos }: { photos: string[] }) => {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-1">
      <div className="h-full flex overflow-hidden rounded-lg">
        <Image
          src={photos[0]}
          alt="photo 1"
          className="w-full h-full object-cover"
          width={1000}
          height={1500}
        />
      </div>
      <div className="h-full flex overflow-hidden rounded-lg">
        {photos[1] && (
          <Image
            src={photos[1]}
            alt="photo 2"
            className="w-full h-full object-cover"
            width={1000}
            height={1500}
          />
        )}
      </div>
    </div>
  );
};

export default GalleryGridTwo;
