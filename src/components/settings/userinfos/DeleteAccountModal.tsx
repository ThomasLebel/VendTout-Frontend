import { useRouter } from "next/navigation";


import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { logout } from "@/app/redux/slices/userSlice";


const DeleteAccountModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {

  const router = useRouter();

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();


  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fonction pour supprimer le compte
  const handleDeleteAccount = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.token, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
            setError("");
            dispatch(logout());
            setIsOpen(false);
            router.push("/");
        } else {
            setError(data.error);
        }
      });
  };


  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="relative w-screen lg:w-96 max-w-lg  border bg-white p-10 rounded-lg">
            <XMarkIcon
              className="absolute top-1 right-1 p-2 w-12 h-12"
              onClick={() => setIsOpen(false)}
            />
            <DialogTitle className="font-semibold text-[22px] text-center pb-5">
              Supprimer mon compte
            </DialogTitle >
            <div className="text-sm text-gray-500 flex flex-col items-center gap-2 pb-10">
                <ExclamationTriangleIcon className="w-10 h10 text-red-800" />
                <p className="text-center">Attention, cette action est <span className="font-bold">irréversible</span>, vous perdrez l&apos;ensemble de vos données.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="newEmail" className="font-normal text-darkGrey">
                  Mot de passe
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="MotDePasse123"
                  className="w-full border-b border-gray-300 p-2 outline-none"
                />
              </div>
              {error && <p className="text-red-800 text-center">{error}</p>}
              <div onClick={handleDeleteAccount}>
              <Button
                bgColor="bg-red-800"
                textColor="text-white"
                text="Confirmer la suppression"
                textSize="text-base"
                wfull={true}
              />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteAccountModal;
