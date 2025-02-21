"use client";

import { useState, useEffect, JSX } from "react";

import Header from "@/components/header/Header";
import GalleryGridFour from "@/components/items/GalleryGridFour";
import GalleryGridThree from "@/components/items/GalleryGridThree";
import GalleryGridTwo from "@/components/items/GalleryGridTwo";
import GalleryGridOne from "@/components/items/GalleryGridOne";
import Lightbox from "@/components/items/Lightbox";
import ItemInformations from "@/components/items/ItemInformations";
import { ProductType, ProductDefaultValues } from "@/types/ProductType";

import { HeartIcon } from "@heroicons/react/24/outline";

const ShowItem = () => {

  const [product, setProduct] = useState<ProductType>(ProductDefaultValues);
  const [isOpenLightbox, setIsOpenLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/67b8bb0700a2e14b00418665`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setProduct(data.productInfos);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  let photos: string[] = product.photos;
  let GalleryGrid: JSX.Element = <></>;

  if (photos.length !== 0) {
    if (photos.length === 1) {
      GalleryGrid = <GalleryGridOne photos={photos} />;
    } else if (photos.length < 3) {
      GalleryGrid = <GalleryGridTwo photos={photos} />;
    } else if (photos.length < 4) {
      GalleryGrid = <GalleryGridThree photos={photos} />;
    } else {
      GalleryGrid = <GalleryGridFour photos={photos} setIsOpenLightbox={setIsOpenLightbox} setCurrentIndex={setCurrentIndex} />;
    }
  }
  

  return (
    <div className="relative">
      <Header />
      <div className="h-screen max-w-screen-xl mx-auto p-2 flex flex-col lg:justify-between lg:flex-row">
        {/* Section Gallerie Photo */}
        <div className="mt-32 h-[40%] md:h-[60%] lg:h-[70%] w-full lg:w-4/6 relative">
          {GalleryGrid}
          <div className="absolute bottom-5 right-4 px-3 py-2 rounded-full bg-lightGrey flex justify-center items-center">
            <HeartIcon className="w-6 h-6 mr-1 text-darkGrey" />
            <span className="text-darkGrey">{product.nbLikes}</span>
          </div>
        </div>
        {/* Section Description */}
        <div className="w-full mt-3 px-2 lg:mt-32 lg:w-[30%]">
          <ItemInformations product={product} />
        </div>
      </div>
      {/* Lightbox */}
      {isOpenLightbox && (
        <Lightbox
          photos={photos}
          isOpenLightbox={isOpenLightbox}
          currentIndex={currentIndex}
          setIsOpenLightbox={setIsOpenLightbox}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
};

export default ShowItem;
