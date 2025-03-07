"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useState } from "react";
import { useAppDispatch } from "@/app/redux/store";
import { updateUser } from "@/app/redux/slices/userSlice";

import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";

interface AuthModalProps {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
}

const AuthModal = ({ isAuthModalOpen, setIsAuthModalOpen }: AuthModalProps) => {
  //Création du dispatch
  const dispatch = useAppDispatch();

  {
    /* Déclaration des états */
  }
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(process.env.NEXT_PUBLIC_SERVER_URL)

  {
    /* Fonction de création de compte */
  }
  const handleSignup = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Email invalide");
      return;
    } else if (password.length < 8) {
      setError("Veuillez saisir un mot de passe de 8 caractères minimum");
      return;
    } else if (pseudo.length < 3) {
      setError("Veuillez saisir un pseudo de 3 caractères minimum");
      return;
    } else {
      setError("");
      const userCredentials = {
        username: pseudo,
        email: email,
        password: password,
      };
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            dispatch(updateUser(data.userInfos));
            setIsAuthModalOpen(false);
            setIsLoading(false);
          } else {
            setError(data.error);
            setIsLoading(false);
          }
        });
    }
  };

  {
    /* Fonction de connexion */
  }
  const handleLogin = () => {
    if (!identifier || !password) {
      setError("Veuillez saisir un email ou un pseudo et un mot de passe");
      return;
    } else if (password.length < 8) {
      setError("Veuillez saisir un mot de passe de 8 caractères minimum");
      return;
    } else {
      setError("");
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            dispatch(updateUser(data.userInfos));
            setIsAuthModalOpen(false);
            setIsLoading(false);
          } else {
            setError(data.error);
            setIsLoading(false);
          }
        });
    }
  };

  // Fonction pour valider les formulaire avec la touche entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isSignup) {
        handleSignup();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <div>
      <Dialog
        open={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex p-6 w-screen items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="relative w-screen lg:w-96 max-w-lg space-y-4 border bg-white p-6 rounded-lg">
            <XMarkIcon
              className="absolute top-1 right-1 p-2 w-12 h-12"
              onClick={() => setIsAuthModalOpen(false)}
            />

            {/* Formulaire de connexion */}

            {!isSignup && (
              <>
                <DialogTitle className="font-semibold text-[22px] text-center pb-4">
                  Se connecter
                </DialogTitle>
                <div className="flex flex-col gap-6">
                  <input
                    type="text"
                    id="identifier"
                    autoCapitalize="none"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email ou pseudo"
                    className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    onKeyDown={handleKeyDown}
                  />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {/* Message d'erreur */}
                {error && (
                  <div className="w-full text-center">
                    <span className="text-red-500 text-sm">{error}</span>
                  </div>
                )}

                {/* Bouton de connexion */}
                <div className="mt-10" onClick={() => handleLogin()}>
                  <Button
                    text="Continuer"
                    bgColor="bg-mainColor"
                    textColor="text-white"
                    wfull={true}
                    textSize="text-base"
                    loading={isLoading}
                  />
                </div>

                {/* Changer de formulaire */}
                <div className="text-center mt-5">
                  <span className="text-sm text-gray-500">
                    Tu n&apos;as pas de compte VendTout ?{" "}
                    <span
                      className="text-mainColor cursor-pointer underline underline-offset-2"
                      onClick={() => setIsSignup(true)}
                    >
                      S&apos;inscrire
                    </span>
                  </span>
                </div>
              </>
            )}

            {/* Formulaire d'inscription */}

            {isSignup && (
              <>
                <DialogTitle className="font-semibold text-[22px] text-center pb-4">
                  Inscris toi avec ton email
                </DialogTitle>
                <div className="flex flex-col gap-6">
                  <input
                    type="text"
                    id="pseudo"
                    autoCapitalize="none"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    placeholder="Pseudo"
                    className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    onKeyDown={handleKeyDown}
                  />
                  <input
                    type="email"
                    id="email"
                    autoCapitalize="none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    onKeyDown={handleKeyDown}
                  />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {/* Message d'erreur */}
                {error && (
                  <div className="w-full text-center">
                    <span className="text-red-500 text-sm">{error}</span>
                  </div>
                )}

                {/* Bouton de connexion */}
                <div className="mt-10" onClick={() => handleSignup()}>
                  <Button
                    text="Continuer"
                    bgColor="bg-mainColor"
                    textColor="text-white"
                    wfull={true}
                    textSize="text-base"
                    loading={isLoading}
                  />
                </div>

                {/* Changer de formulaire */}
                <div className="text-center mt-5">
                  <span className="text-sm text-gray-500">
                    Tu as déjà un compte VendTout ?{" "}
                    <span
                      className="text-mainColor cursor-pointer underline underline-offset-2"
                      onClick={() => setIsSignup(false)}
                    >
                      Se connecter
                    </span>
                  </span>
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default AuthModal;
