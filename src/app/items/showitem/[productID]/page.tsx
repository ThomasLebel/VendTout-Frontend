"use client";

import { useState, useEffect, JSX } from "react";
import { use } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";

import { updateUser } from "@/app/redux/slices/userSlice";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import GalleryGridFour from "@/components/items/GalleryGridFour";
import GalleryGridThree from "@/components/items/GalleryGridThree";
import GalleryGridTwo from "@/components/items/GalleryGridTwo";
import GalleryGridOne from "@/components/items/GalleryGridOne";
import Lightbox from "@/components/items/Lightbox";
import ItemInformations from "@/components/items/ItemInformations";
import SellerInformations from "@/components/items/SellerInformations";
import AuthModal from "@/components/header/AuthModal";
import PostedProductsFeed from "@/components/member/PostedProductsFeed";

import { ProductType, ProductDefaultValues } from "@/types/ProductType";

import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";

const ShowItem = ({ params }: { params: Promise<{ productID: string }> }) => {
  const { productID } = use(params);

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductType>(ProductDefaultValues);
  const [otherProducts, setOtherProducts] = useState<ProductType[]>([]);
  const [ownProduct, setOwnProduct] = useState<boolean>(false);
  const [isOpenLightbox, setIsOpenLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nbLikes, setNbLikes] = useState(0);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  console.log(otherProducts);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          if (data.productInfos.userID.username === user.username) {
            setOwnProduct(true);
          }
          setProduct(data.productInfos);
          setNbLikes(data.productInfos.nbLikes);
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/postedProducts/${data.productInfos.userID.username}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.result) {
                setOtherProducts(
                  data.products.filter(
                    (product: ProductType) => product._id !== productID
                  )
                );
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const handleLike = () => {
    if (!user.token) {
      setOpenAuthModal(true);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        id: productID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setNbLikes(data.nbLikes);
          dispatch(updateUser(data.userInfos));
        }
      });
  };

  let photos: string[] = product.photos;
  let GalleryGrid: JSX.Element = <></>;

  // Choix de la grille à afficher en fonction du nombre de photos
  if (photos.length !== 0) {
    if (photos.length === 1) {
      GalleryGrid = (
        <GalleryGridOne
          photos={photos}
          setIsOpenLightbox={setIsOpenLightbox}
          setCurrentIndex={setCurrentIndex}
        />
      );
    } else if (photos.length < 3) {
      GalleryGrid = (
        <GalleryGridTwo
          photos={photos}
          setIsOpenLightbox={setIsOpenLightbox}
          setCurrentIndex={setCurrentIndex}
        />
      );
    } else if (photos.length < 4) {
      GalleryGrid = (
        <GalleryGridThree
          photos={photos}
          setIsOpenLightbox={setIsOpenLightbox}
          setCurrentIndex={setCurrentIndex}
        />
      );
    } else {
      GalleryGrid = (
        <GalleryGridFour
          photos={photos}
          setIsOpenLightbox={setIsOpenLightbox}
          setCurrentIndex={setCurrentIndex}
        />
      );
    }
  }

  // Choix de l'icône du coeur en fonction de si le produit est liké ou non par l'utilisateur
  let heartIcon: JSX.Element = <HeartIcon className="w-6 h-6 text-darkGrey" />;
  if (user.likedProducts) {
    if (user.likedProducts.includes(product._id)) {
      heartIcon = <HeartIconFilled className="w-6 h-6 text-[#CC4454]" />;
    }
  }

  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto p-2 flex flex-col lg:justify-between lg:flex-row">
        {/* Section Gallerie Photo */}
        <div className="w-full ">
          <div className="mt-32 h-[400px] md:h-[550px] lg:h-[600px] w-full lg:w-[95%] relative">
            {GalleryGrid}
            <div
              className="absolute bottom-5 right-4 px-3 py-2 rounded-full bg-lightGrey flex justify-center items-center cursor-pointer"
              onClick={handleLike}
            >
              {heartIcon}
              {nbLikes > 0 && (
                <span className="text-darkGrey ml-1">{nbLikes}</span>
              )}
            </div>
          </div>
          {/* Section autres produits en vente affiché sur desktop */}
          <div className="hidden lg:block">
            <PostedProductsFeed products={otherProducts} />
          </div>
        </div>

        {/* Section Description */}
        <div className="w-full mt-3 px-2 lg:mt-32 lg:w-[40%]">
          <ItemInformations product={product} ownProduct={ownProduct} />
          <SellerInformations product={product} />
          {/* Section autres produits en vente affiché sur mobile */}
          <div className=" lg:hidden">
            <PostedProductsFeed products={otherProducts} />
          </div>
        </div>
      </div>
      <Footer/>
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
      {openAuthModal && (
        <AuthModal
          isAuthModalOpen={openAuthModal}
          setIsAuthModalOpen={setOpenAuthModal}
        />
      )}
      
    </div>
  );
};

export default ShowItem;
