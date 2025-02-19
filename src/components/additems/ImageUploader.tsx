"use client";

import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

import { useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";

import resizeImage from "@/lib/utils/resizeImage";
import dataURLtoFile from "@/lib/utils/dataURLtoFile";

const ImageUploader = ({photos, setPhotos}: {photos: File[], setPhotos: React.Dispatch<React.SetStateAction<File[]>>}) => {

  const [photosURL, setPhotosUrl] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

 

  // Fonction pour gérer le drop des photos
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const droppedFiles: File[] = [...e.dataTransfer.files];
    // Vérification des types de fichiers pour garder seulement les images
    const droppedPhotos: File[] = droppedFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    );
    // Boucle sur toutes les images
    for (let photo of droppedPhotos) {
      // Création d'une url
      const imageUrl: string = URL.createObjectURL(photo);
      // Création d'une image et association de l'utl
      const img: HTMLImageElement = document.createElement("img");
      img.src = imageUrl;

      // Attendre que l'image soit chargée avant de la redimensionner
      img.onload = () => {
        const resizedImage = resizeImage(img, 1000, 1500, false);
        const resizedImageURL = resizedImage.toDataURL("image/jpeg");
        setPhotosUrl((prev) => [...prev, resizedImageURL]);
        setPhotos((prev) => [...prev, dataURLtoFile(resizedImageURL, "image.jpg")]);
      };
    }
    setIsDragging(false);
  };

  // Fonction pour gérer le drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  // Fonction pour gérer le click sur le bouton d'upload
  const handleUploadClick = () => {
    document.getElementById("file-input")?.click();
  };

  // Fonction pour gérer le changement du fichier dans l'input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const droppedFiles: File[] = [...e.target.files];
    const droppedPhotos: File[] = droppedFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    );
    // Boucle sur toutes les images
    for (let photo of droppedPhotos) {
        // Création d'une url
        const imageUrl: string = URL.createObjectURL(photo);
        // Création d'une image et association de l'utl
        const img: HTMLImageElement = document.createElement("img");
        img.src = imageUrl;
  
        // Attendre que l'image soit chargée avant de la redimensionner
        img.onload = () => {
          const resizedImage = resizeImage(img, 1000, 1500, false);
          const resizedImageURL = resizedImage.toDataURL("image/jpeg");
          setPhotosUrl((prev) => [...prev, resizedImageURL]);
          setPhotos((prev) => [...prev, dataURLtoFile(resizedImageURL, "image.jpg")]);
        };
      }
      setIsDragging(false);
  };

  // Fonction pour supprimer une photo
  const handleDeletePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotosUrl(photosURL.filter((_, i) => i !== index));
  };

  return (
    <div
      className="w-full border border-dashed flex items-center justify-center p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
    >
      {isDragging ? (
        <p className="text-darkGrey font-bold p-24">Droppez vos photos ici</p>
      ) : photosURL.length === 0 ? (
        <div onClick={handleUploadClick} className="md:p-18 sm:p-12 p-6">
          <Button
            bgColor="bg-white"
            textColor="text-mainColor"
            text="+ Ajoute des photos"
            border={true}
            textSize="text-base"
          />
        </div>
      ) : (
        <div className="w-full flex items-center flex-wrap">
          {photosURL.map((url, index) => (
            <div className=" w-1/3 md:w-1/5" key={index}>
              <div className="relative w-full aspect-square rounded-lg p-2">
                <Image
                  src={url}
                  alt={`Uploaded ${index}`}
                  width={60}
                  height={60}
                  className=" w-full h-full object-cover rounded-lg select-none"
                  draggable={false}
                />
                <div className="absolute top-4 right-4 w-7 h-7 bg-white rounded-md flex items-center justify-center cursor-pointer">
                  <XMarkIcon
                    className="text-black w-5 h-5"
                    onClick={() => handleDeletePhoto(index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={handleUploadClick}
            className="h-32 w-1/3 md:w-1/5 flex items-center justify-center"
          >
            <Button
              bgColor="bg-white"
              textColor="text-mainColor"
              text="+"
              border={true}
              textSize="text-3xl"
            />
          </div>
        </div>
      )}

      <input
        type="file"
        id="file-input"
        multiple
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
