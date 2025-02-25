"use client";

import { useState } from "react";
import { useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Header from "@/components/header/Header";
import ImageUploader from "@/components/items/additems/ImageUploader";
import CategoriesSelectorModal from "@/components/ui/CategoriesSelectorModal";
import SizeModal from "@/components/ui/SizeModal";
import ColorModal from "@/components/ui/ColorModal";
import ConditionModal from "@/components/ui/ConditionModal";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

const addItem = () => {

  const user = useAppSelector((state) => state.user.value);
  const router = useRouter();

  const [photos, setPhotos] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isCategoriesSelectorOpen, setIsCategoriesSelectorOpen] =
    useState<boolean>(false);
  const [isSizesSelectorOpen, setIsSizesSelectorOpen] =
    useState<boolean>(false);
  const [isColorsSelectorOpen, setIsColorsSelectorOpen] =
    useState<boolean>(false);
  const [isConditionSelectorOpen, setIsConditionSelectorOpen] =
    useState<boolean>(false);

  // Fonction pour vérifier si le prix est un nombre

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setPrice(value);
    }
  };

  const handleBlurPrice = () => {
    if (price) {
      const formattedPrice = parseFloat(price).toFixed(2);
      setPrice(formattedPrice);
    }
  };

  const handlePublishItem = () => {
    setLoading(true);
    if (
      photos.length === 0 ||
      title === "" ||
      description === "" ||
      selectedGender === "" ||
      selectedSubCategory === "" ||
      brand === "" ||
      selectedSize === "" ||
      selectedColor === "" ||
      selectedCondition === "" ||
      price === ""
    ) {
      setError("Veuillez ajouter au moins une photo et remplir tous les champs");
      setLoading(false);
    } else {
      setError("");
      const formData = new FormData();
      formData.append("token", user.token || "");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("gender", selectedGender);
      formData.append("subCategory", selectedSubCategory);
      formData.append("brand", brand);
      formData.append("size", selectedSize);
      formData.append("condition", selectedCondition);
      formData.append("color", selectedColor);
      formData.append("price", price);
      for (let photo of photos) {
        formData.append("photos", photo);
      }
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/addItem`, {
        method: "POST",
        body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setLoading(false);
          router.push(`/member/${user.username}`);
        } else {
          setError(data.error);
          setLoading(false);
        }
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-lightGrey  w-screen p-2">
        <div className="max-w-screen-lg mx-auto p-5 flex flex-col gap-4 items-center">
          {/* Titre H1*/}
          <div className="pt-32 w-full">
            <h1 className="font-semibold text-xl">Vends ton article</h1>
          </div>

          {/* Section Principale */}
          <div className=" w-full rounded-md p-4 flex flex-col gap-6 ">
            {/* Section upload de photos */}
            <div className="bg-white w-full p-5 rounded-md border border-gray-200">
              <ImageUploader setPhotos={setPhotos} photos={photos} />
            </div>
            {/* Section Titre et description */}
            <div className="bg-white w-full rounded-md border border-gray-200">
              {/* Titre */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Titre
                </span>
                <input
                  id="title"
                  type="text"
                  placeholder="ex : Chemise Sézane verte"
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              {/* Description */}
              <div className="w-full flex flex-col md:flex-row  justify-between  p-6 border-b border-gray-300 ">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black mb-4 md:mb-0">
                  Décris ton article
                </span>
                <textarea
                  id="description"
                  placeholder="ex : porté quelques fois, taille correctement"
                  className="border-b border-gray-200 focus:border-mainColor pb-20 outline-none md:w-3/6 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Section caractéristiques produit */}
            <div className="bg-white w-full rounded-md border border-gray-200">
              {/* Catégorie */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Catégorie
                </span>
                <div
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6 cursor-pointer"
                  onClick={() => setIsCategoriesSelectorOpen(true)}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {selectedSubCategory || (
                        <span className="text-gray-400">
                          Sélectionne une catégorie
                        </span>
                      )}
                    </span>
                    <ChevronDownIcon className="w-5 h-5 mr-2 text-darkGrey" />
                  </div>
                  <CategoriesSelectorModal
                    isOpen={isCategoriesSelectorOpen}
                    setIsOpen={setIsCategoriesSelectorOpen}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                  />
                </div>
              </div>

              {/* Marque*/}
              {selectedSubCategory && (
                <>
                  <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                    <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                      Marque
                    </span>
                    <input
                      id="brand"
                      type="text"
                      placeholder="Saisis une marque"
                      className="border-b border-gray-200 py-2 outline-none md:w-3/6"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></input>
                  </div>

                  {/* Taille */}
                  <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                    <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                      Taille
                    </span>
                    <div
                      className="border-b border-gray-200 py-2 outline-none md:w-3/6 cursor-pointer"
                      onClick={() => setIsSizesSelectorOpen(true)}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {selectedSize || (
                            <span className="text-gray-400">
                              Sélectionne une taille
                            </span>
                          )}
                        </span>
                        <ChevronDownIcon className="w-5 h-5 mr-2 text-darkGrey" />
                      </div>
                      <SizeModal
                        isOpen={isSizesSelectorOpen}
                        setIsOpen={setIsSizesSelectorOpen}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        selectedSubCategory={selectedSubCategory}
                        selectedGender={selectedGender}
                      />
                    </div>
                  </div>

                  {/* Etat */}
                  <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                    <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                      État
                    </span>
                    <div
                      className="border-b border-gray-200 py-2 outline-none md:w-3/6 cursor-pointer"
                      onClick={() => setIsConditionSelectorOpen(true)}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {selectedCondition || (
                            <span className="text-gray-400">
                              Sélectionne un état
                            </span>
                          )}
                        </span>
                        <ChevronDownIcon className="w-5 h-5 mr-2 text-darkGrey" />
                      </div>
                      <ConditionModal
                        isOpen={isConditionSelectorOpen}
                        setIsOpen={setIsConditionSelectorOpen}
                        selectedCondition={selectedCondition}
                        setSelectedCondition={setSelectedCondition}
                      />
                    </div>
                  </div>

                  {/* Couleur */}
                  <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                    <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                      Couleur
                    </span>
                    <div
                      className="border-b border-gray-200 py-2 outline-none md:w-3/6 cursor-pointer"
                      onClick={() => setIsColorsSelectorOpen(true)}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {selectedColor || (
                            <span className="text-gray-400">
                              Sélectionne une couleur
                            </span>
                          )}
                        </span>
                        <ChevronDownIcon className="w-5 h-5 mr-2 text-darkGrey" />
                      </div>
                      <ColorModal
                        isOpen={isColorsSelectorOpen}
                        setIsOpen={setIsColorsSelectorOpen}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Section Prix */}
            <div className="bg-white w-full rounded-md border border-gray-200">
              {/* Prix */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Prix
                </span>
                <div className="flex items-center md:w-3/6 relative">
                  <input
                    id="price"
                    type="text"
                    placeholder="0,00 €"
                    className="border-b border-gray-200 py-2 outline-none w-full"
                    value={price}
                    onChange={handleChangePrice}
                    onBlur={handleBlurPrice}
                  ></input>
                  {price && (
                    <span className="text-lg text-darkGrey md:text-base absolute right-3">
                      €
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section Bouton */}
            {error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
            <div className="w-full flex justify-end">
              <div className="w-full md:w-[150px]" onClick={handlePublishItem}>
                <Button
                  text="Ajouter"
                  bgColor="bg-mainColor"
                  textColor="text-white"
                  textSize="text-base"
                  wfull={true}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addItem;
