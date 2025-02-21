import Image from "next/image";

const GalleryGridTwo = ({ photos }: { photos: string[] }) => {
  return (
    <div className="w-full h-full gap-1 rounded-lg overflow-hidden">

        <Image
          src={photos[0]}
          alt="photo 1"
          className="w-full h-full object-cover"
          width={1000}
          height={1500}
        />

      
    </div>
  );
};

export default GalleryGridTwo;
