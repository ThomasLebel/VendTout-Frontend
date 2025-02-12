import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";

interface AuthModalProps {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
}

const AuthModal = ({ isAuthModalOpen, setIsAuthModalOpen }: AuthModalProps) => {
  const [isSignup, setIsSignup] = useState<boolean>(true);

  return (
    <div>
      <Dialog
        open={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="relative w-screen lg:w-96 max-w-lg space-y-4 border bg-white p-6 rounded-lg">
            <XMarkIcon
              className="absolute top-1 right-1 p-2 w-12 h-12"
              onClick={() => setIsAuthModalOpen(false)}
            />
            {!isSignup && (
              <>
                <DialogTitle className="font-semibold text-[22px] text-center pb-4">
                  Se connecter
                </DialogTitle>
                  <div className="flex flex-col gap-6">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    />
                    <input
                      type="password"
                      id="password"
                      placeholder="Mot de passe"
                      className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mt-10">
                    <Button
                      text="Continuer"
                      bgColor="bg-mainColor"
                      textColor="text-white"
                      wfull={true}
                      textSize="text-base"
                    />
                  </div>
                  <div className="text-center mt-5">
                    <span className="text-sm text-gray-500">
                      Tu n'as pas de compte VendTout ?{" "}
                      <span className="text-mainColor cursor-pointer underline underline-offset-2" onClick={() => setIsSignup(true)}>
                        S'inscrire
                      </span>
                    </span>
                  </div>
              </>
            )}
            {isSignup && (
              <>
                <DialogTitle className="font-semibold text-[22px] text-center pb-4">
                  Inscris toi avec ton email 
                </DialogTitle>
                <form>
                  <div className="flex flex-col gap-6">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    />
                    <input
                      type="password"
                      id="password"
                      placeholder="Mot de passe"
                      className="w-full pb-1 border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mt-10">
                    <Button
                      text="Continuer"
                      bgColor="bg-mainColor"
                      textColor="text-white"
                      wfull={true}
                      textSize="text-base"
                    />
                  </div>
                  <div className="text-center mt-5">
                    <span className="text-sm text-gray-500">
                      Tu as déjà un compte VendTout ?{" "}
                      <span className="text-mainColor cursor-pointer underline underline-offset-2" onClick={() => setIsSignup(false)}>
                        Se connecter
                      </span>
                    </span>
                  </div>
                </form>{" "}
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default AuthModal;
