"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/redux/store";

import Header from "@/components/header/Header";
import Button from "@/components/ui/Button";
import SettingsSection from "@/components/settings/SettingsSection";
import ChangeMailModal from "@/components/settings/userinfos/ChangeMailModal";
import DeleteAccountModal from "@/components/settings/userinfos/DeleteAccountModal";

const profile = () => {
  //Récupération de l'utilisateur
  const user = useAppSelector((state) => state.user.value);

  //Déclaration des états
  const [fullName, setFullName] = useState<string>(user.fullName || "");
  const [gender, setGender] = useState<string>(user.gender || "");
  const [birthDate, setBirthDate] = useState<string>(user.birthDate || "");
  const [isChangeMailModalOpen, setIsChangeMailModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);

  // Useffect pour récupérer les informations de l'utilisateur mis à jour
  useEffect(() => {
    setFullName(user.fullName || "");
    setGender(user.gender || "");
    setBirthDate(user.birthDate || "");
  }, [user]);

  // Fonction pour modifier les informations de l'utilisateur
  const handleSave = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        fullName: fullName,
        gender: gender,
        birthDate: birthDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <Header />
      <div className="bg-lightGrey h-screen">
        <div className="lg:max-w-screen-xl mx-auto lg:flex">
          <SettingsSection />
          <div className="w-screen flex flex-col items-center px-8 lg:pt-32">
            {/* Email utilisateur */}
            <div className="bg-white mt-5 w-full">
              <div className="w-full flex justify-between items-center p-6">
                <span className="text-base font-medium">
                  {user.email || ""}
                </span>
                <div onClick={() => setIsChangeMailModalOpen(true)}>
                  <Button
                    bgColor="white"
                    border={true}
                    textColor="text-mainColor"
                    text="Changer"
                  />
                </div>
              </div>
            </div>
            {/* Modale pour changer d'email */}
            <ChangeMailModal
              isOpen={isChangeMailModalOpen}
              setIsOpen={setIsChangeMailModalOpen}
            />
            {/* Informations utilisateur */}
            <div className="bg-white mt-5 w-full">
              {/* Nom Complet */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Nom Complet
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="par ex: Claire Dupont"
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6"
                ></input>
              </div>

              {/* Genre*/}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Tu es
                </span>
                <select
                  id="gender"
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6 bg-white"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Tu es :</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Date de naissance */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between  p-6 border-b border-gray-300">
                <span className="text-sm text-darkGrey md:text-base md:font-medium md:text-black">
                  Date de naissance
                </span>
                <input
                  id="birthDate"
                  value={birthDate}
                  type="date"
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="border-b border-gray-200 py-2 outline-none md:w-3/6"
                ></input>
              </div>
            </div>

            {/* Bouton de suppression de compte */}
            <div className="bg-white mt-5 w-full hover:bg-gray-200 cursor-pointer" onClick={() => setIsDeleteAccountModalOpen(true)}>
              <div className="w-full flex justify-between items-center p-6">
                <span className="text-base font-medium">
                  Supprimer mon compte
                </span>
                <span className="text-xl font-semibold text-darkGrey">
                  {">"}
                </span>
              </div>
            </div>
            {/* Modale pour supprimer le compte */}
            <DeleteAccountModal
              isOpen={isDeleteAccountModalOpen}
              setIsOpen={setIsDeleteAccountModalOpen}
            />

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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
