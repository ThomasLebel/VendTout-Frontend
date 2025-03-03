"use client";

import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";

import Image from "next/image";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Button from "@/components/ui/Button";
import SettingsSection from "@/components/settings/SettingsSection";

import { updateUser } from "@/app/redux/slices/userSlice";
import resizeImage from "@/lib/utils/resizeImage";
import dataURLtoFile from "@/lib/utils/dataURLtoFile";

const profile = () => {
  //Récupération de l'utilisateur
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  //Déclaration des états
  const [profilePicture, setProfilePicture] = useState<string>(
    user.profilePicture ||
      "https://res.cloudinary.com/dkf48p2ah/image/upload/v1739526042/idkhe6v85woa3fdoszls.jpg"
  );
  const [aboutDescription, setAboutDescription] = useState<string>(
    user.aboutDescription || ""
  );
  const [country, setCountry] = useState<string>(user.country || "");
  const [city, setCity] = useState<string>(user.city || "");
  const [file, setFile] = useState<File | null>(null);
  

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fonction pour gérer l'upload de l'image de profil
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Récupérer le fichier sélectionné
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      // Créer un nouvel objet Image
      const img: HTMLImageElement = document.createElement("img");
      img.src = imageURL;

      // Attendre que l'image soit chargée avant de la redimensionner
      img.onload = () => {
        const resizedImage = resizeImage(img, 100, 100);
        const resizedImageURL = resizedImage.toDataURL("image/jpeg");
        setProfilePicture(resizedImageURL);
        setFile(dataURLtoFile(resizedImageURL, "image.jpg"));
      };
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    setLoading(true)
    const formData = new FormData();
    if (file) {
      formData.append("profilePicture", file);
    }
    formData.append("aboutDescription", aboutDescription);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("token", user.token || "");
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/profile`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateUser(data.userInfos));
          setSuccess("Modifications enregistrées avec succès");
          setError("");
          setLoading(false);
        } else {
          setError(data.error);
          setSuccess("");
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <Header />
      <div className="bg-lightGrey min-h-screen">
        <div className="lg:max-w-screen-xl mx-auto lg:flex">
          <SettingsSection />
          <div className="w-screen flex flex-col items-center px-8 lg:pt-32">
            {/* Section photo profil et à propos de toi */}
            <div className="bg-white mt-5 w-full">
              {/* Avatar utilisateur */}
              <div className="w-full flex justify-between items-center p-6 border-b border-gray-300 pb-8">
                <span className="text-base font-medium">
                  Ta photo de profil
                </span>
                <div className="flex items-center gap-4">
                  <Image
                    src={profilePicture}
                    alt="avatar"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  <div onClick={handleButtonClick}>
                    <Button
                      bgColor="white"
                      border={true}
                      textColor="text-mainColor"
                      text="Choisir une photo"
                    />
                  </div>
                </div>
              </div>
              {/* À propos de toi */}
              <div className="w-full flex flex-col md:flex-row  justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black mb-4 md:mb-0">
                  À propos de toi
                </span>
                <textarea
                  id="about"
                  value={aboutDescription}
                  onChange={(e) => setAboutDescription(e.target.value)}
                  placeholder="Présente-toi aux autres membres"
                  className="border-b border-gray-200 focus:border-mainColor pb-20 outline-none md:w-3/6 resize-none"
                ></textarea>
              </div>
            </div>
            {/* Position utilisateur */}
            <div className="bg-white mt-5 w-full">
              {/* Pays */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Pays
                </span>
                <input
                  id="country"
                  type="text"
                  placeholder="Exemple : France"
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></input>
              </div>

              {/* Ville */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Ville
                </span>
                <input
                  id="city"
                  type="text"
                  placeholder="Exemple : Paris"
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-5">{error}</div>
            )}
            {success && (
              <div className="text-green-500 text-center mt-5">{success}</div>
            )}
            {/* Bouton de sauvegarde des modifications */}
            <div
              className="w-full flex justify-end items-center p-6"
              onClick={handleSave}
            >
              <Button
                bgColor="bg-mainColor"
                textColor="text-white"
                text="Enregistrer"
                textSize="text-sm"
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default profile;
