import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { updateUser } from "@/app/redux/slices/userSlice";

const ShippingModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setFullName(user.shippingAddress?.fullName || "");
    setStreet(user.shippingAddress?.street || "");
    setZipCode(user.shippingAddress?.zipCode || "");
    setCity(user.shippingAddress?.city || "");
  }, [user.shippingAddress]);

  const handleSave = () => {
    if (fullName === "" || street === "" || zipCode === "" || city === "") {
      setError("Veuillez remplir tous les champs");
    } else {
      setLoading(true)
      setError("");
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/shippingAddress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: user.token,
          fullName,
          street,
          zipCode,
          city,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setIsOpen(false);
            dispatch(updateUser(data.userInfos));
            setLoading(false)
          } else {
            setError(data.error);
            setLoading(false)
          }
        });
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="relative w-screen lg:w-96 max-w-lg  border bg-white rounded-lg">
            <DialogTitle className="font-semibold text-base text-center py-4 border-b border-gray-300 w-full">
              Ajouter l&apos;adresse de livraison
            </DialogTitle>
            <div className="flex flex-col gap-4 p-8">
              {/* Nom et prénom*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullname" className="font-normal text-darkGrey">
                  Nom complet
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  id="fullname"
                  placeholder="Ex : Lucie Dupont"
                  className="w-full border-b border-gray-300 pb-2 outline-none"
                />
              </div>

              {/* Adresse*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="font-normal text-darkGrey">
                  N° et nom de rue
                </label>
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  type="text"
                  id="address"
                  placeholder="Ex : 10 rue du Printemps"
                  className="w-full border-b border-gray-300 pb-2 outline-none"
                  autoComplete="on"
                />
              </div>

              {/* Code Postal*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="zipCode" className="font-normal text-darkGrey">
                  Code postal
                </label>
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  type="text"
                  id="zipCode"
                  placeholder="Ex : 75000"
                  className="w-full border-b border-gray-300 pb-2 outline-none "
                />
              </div>

              {/* Ville*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="font-normal text-darkGrey">
                  Ville
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  id="city"
                  placeholder="Ex : Paris"
                  className="w-full border-b border-gray-300 pb-2 outline-none"
                />
              </div>

              {/*Erreur*/}
              <div className="text-red-500 text-sm text-center">{error}</div>

              {/* Bouton validation*/}
              <div className="mt-3 w-full" onClick={handleSave}>
                <Button
                  bgColor="bg-mainColor"
                  textColor="text-white"
                  text="Enregistrer"
                  textSize="text-base"
                  wfull={true}
                  loading={loading}
                />
              </div>

              {/* Bouton annuler*/}
              <div
                className=" w-full rounded-md hover:bg-gray-200 hover:bg-opacity-25"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  bgColor="bg-transparent"
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

export default ShippingModal;
