"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CategoryButton from "@/components/ui/CategoryButton";
import OptionSelectedButton from "@/components/ui/OptionSelectedButton";
import CategoriesSelectorModal from "@/components/ui/CategoriesSelectorModal";
import SizeModal from "@/components/ui/SizeModal";
import ConditionModal from "@/components/ui/ConditionModal";
import ColorModal from "@/components/ui/ColorModal";
import BrandModal from "@/components/ui/BrandModal";
import CatalogFeed from "@/components/catalog/CatalogFeed";
import Button from "@/components/ui/Button";

import { ProductType } from "@/types/ProductType";

const Catalog = () => {
  const searchParams = useSearchParams();

  const [isCategoriesSelectorOpen, setIsCategoriesSelectorOpen] =
    useState<boolean>(false);
  const [isSizesSelectorOpen, setIsSizesSelectorOpen] =
    useState<boolean>(false);
  const [isConditionSelectorOpen, setIsConditionSelectorOpen] =
    useState<boolean>(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] =
    useState<boolean>(false);
  const [isBrandSelectorOpen, setIsBrandSelectorOpen] =
    useState<boolean>(false);

  const [globalSearch, setGlobalSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    searchParams.get("gender") || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setSelectedGender(searchParams.get("gender") || "");
    setGlobalSearch(searchParams.get("search") || "");
    setSelectedSubCategory("");
    setSelectedSize("");
    setSelectedCondition("");
    setSelectedColor("");
    setSelectedBrand("");
  }, [searchParams]);

  useEffect(() => {
    if (
      !globalSearch &&
      !selectedGender &&
      !selectedSubCategory &&
      !selectedSize &&
      !selectedCondition &&
      !selectedColor &&
      !selectedBrand
    ) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/find/${page}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            if (page === 1) {
              setProducts(data.products);
              setHasMore(data.hasMore);
              setPage(page + 1);
            } else {
              setProducts([...products, ...data.products]);
              setHasMore(data.hasMore);
              setPage(page + 1);
            }
          }
        });
    } else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/filteredProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          globalSearch: globalSearch,
          gender: selectedGender,
          subCategory: selectedSubCategory,
          size: selectedSize,
          condition: selectedCondition,
          color: selectedColor,
          brand: selectedBrand,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setProducts(data.products);
          }
        });
    }
  }, [
    globalSearch,
    selectedGender,
    selectedSubCategory,
    selectedSize,
    selectedCondition,
    selectedColor,
    selectedBrand,
    refresh
  ]);

  return (
    <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Chargement...</div>}>
    <div>
      <Header />
      <div className="mt-32 w-full p-6 flex flex-col items-center">
        <div className="max-w-screen-xl min-h-[700px] w-full">
          <h1 className="text-xl font-semibold text-black">
            {selectedGender ? selectedGender : "Catalogue"}
          </h1>
          {/* Section boutons options de recherche */}
          <div className="w-full mt-4 py-4 border-t border-b border-gray-300 flex flex-col gap-4">
            <div className="flex items-center flex-wrap gap-2">
              <CategoryButton
                category="Catégorie"
                setOpenModal={setIsCategoriesSelectorOpen}
                value={selectedSubCategory}
              />
              <CategoriesSelectorModal
                isOpen={isCategoriesSelectorOpen}
                setIsOpen={setIsCategoriesSelectorOpen}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
              />
              <CategoryButton
                category="Taille"
                setOpenModal={setIsSizesSelectorOpen}
                value={selectedSize}
              />
              <SizeModal
                isOpen={isSizesSelectorOpen}
                setIsOpen={setIsSizesSelectorOpen}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedSubCategory={selectedSubCategory}
                selectedGender={selectedGender}
              />
              <CategoryButton
                category="Marque"
                setOpenModal={setIsBrandSelectorOpen}
                value={selectedBrand}
              />
              <BrandModal
                isOpen={isBrandSelectorOpen}
                setIsOpen={setIsBrandSelectorOpen}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
              />
              <CategoryButton
                category="État"
                setOpenModal={setIsConditionSelectorOpen}
                value={selectedCondition}
              />
              <ConditionModal
                isOpen={isConditionSelectorOpen}
                setIsOpen={setIsConditionSelectorOpen}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
              />
              <CategoryButton
                category="Couleur"
                setOpenModal={setIsColorSelectorOpen}
                value={selectedColor}
              />
              <ColorModal
                isOpen={isColorSelectorOpen}
                setIsOpen={setIsColorSelectorOpen}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>
            {(selectedSubCategory ||
              selectedSize ||
              selectedBrand ||
              selectedCondition ||
              selectedColor) && (
              <div className="flex items-center flex-wrap gap-2">
                {/* Affichage des options sélectionnées */}
                {globalSearch && (
                  <div className="flex items-center flex-wrap gap-2">
                    <OptionSelectedButton
                      optionValue={globalSearch}
                      setOptionValue={setGlobalSearch}
                    />
                  </div>
                )}
                {selectedSubCategory && (
                  <div className="flex items-center flex-wrap gap-2">
                    <OptionSelectedButton
                      optionValue={selectedSubCategory}
                      setOptionValue={setSelectedSubCategory}
                    />
                  </div>
                )}
                {selectedSize && (
                  <div className="flex items-center flex-wrap gap-2">
                    <OptionSelectedButton
                      optionValue={selectedSize}
                      setOptionValue={setSelectedSize}
                    />
                  </div>
                )}
                {selectedBrand && (
                  <div className="flex items-center flex-wrap gap-2">
                    <OptionSelectedButton
                      optionValue={selectedBrand}
                      setOptionValue={setSelectedBrand}
                    />
                  </div>
                )}
                {selectedCondition && (
                  <div className="flex items-center flex-wrap gap-2">
                    <OptionSelectedButton
                      optionValue={selectedCondition}
                      setOptionValue={setSelectedCondition}
                    />
                  </div>
                )}
                {selectedColor && (
                  <div className="flex items-center flex-wrap gap-2">
                    <OptionSelectedButton
                      optionValue={selectedColor}
                      setOptionValue={setSelectedColor}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Feed des produits filtrés */}
          <CatalogFeed products={products} />
          {!hasMore && <div className="w-full h-24 flex justify-center items-center" onClick={() => setRefresh(!refresh)}>
            <Button text="Voir plus" textColor="text-white" bgColor="bg-mainColor" textSize="text-base"/>
          </div>}
        </div>
      </div>
      <Footer/>
    </div>
    </Suspense>
  );
};

export default Catalog;
