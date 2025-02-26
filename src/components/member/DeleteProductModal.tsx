import { useRouter } from "next/navigation";


import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { logout } from "@/app/redux/slices/userSlice";


const DeleteProductModal = ({
  isOpen,
  setIsOpen,
  refresh = false,
  setRefresh = () => {},
  productID,
  fromShowItem = false
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refresh? : boolean,
  setRefresh?: (refresh: boolean) => void;
  productID: string;
  fromShowItem? : boolean
}) => {

  const router = useRouter();

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false)

  // Fonction pour supprimer l'annonce'
  const handleDeleteProduct = () => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.token}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
            setError("");
            setLoading(false)
            setIsOpen(false);
            setRefresh(!refresh)
            if (fromShowItem){
              router.push(`/member/${user.username}`)
            }
        } else {
            setLoading(false)
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
          <DialogPanel className="relative w-screen lg:w-96 max-w-lg  border bg-white p-8 rounded-lg">
            <XMarkIcon
              className="absolute top-1 right-1 p-2 w-12 h-12"
              onClick={() => setIsOpen(false)}
            />
            <DialogTitle className="font-semibold text-[22px] text-center pb-5">
              Supprimer mon annonce
            </DialogTitle >
            <div className="text-sm text-gray-500 flex flex-col items-center gap-2 pb-10">
                <ExclamationTriangleIcon className="w-10 h10 text-red-800" />
                <p className="text-center">Attention, cette action est <span className="font-bold">irréversible</span>, êtes vous sûr de vouloir supprimer cette annonce ?</p>
            </div>
            <div className="flex flex-col gap-4">
              {error && <p className="text-red-800 text-center">{error}</p>}
              <div onClick={handleDeleteProduct}>
              <Button
                bgColor="bg-red-800"
                textColor="text-white"
                text="Confirmer la suppression"
                textSize="text-base"
                wfull={true}
                loading={loading}
              />
              </div>
              <div onClick={() => setIsOpen(false)}>
              <Button
                bgColor="bg-white"
                border={true}
                textColor="text-mainColor"
                text="Annuler"
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

export default DeleteProductModal;
