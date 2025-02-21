import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { updateUser } from "@/app/redux/slices/userSlice";

const ChangeMailModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fonction pour modifier l'email
  const handleChangeEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newEmail)) {
      setError("Email invalide");
      return;
    } else {
      setError("");
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newEmail, password, token: user.token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            dispatch(updateUser(data.userInfos));
            setIsOpen(false);
            setNewEmail("");
            setPassword("");
            setError("");
          } else {
            setError(data.error);
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
          <DialogPanel className="relative w-screen lg:w-96 max-w-lg  border bg-white p-10 rounded-lg">
            <XMarkIcon
              className="absolute top-1 right-1 p-2 w-12 h-12"
              onClick={() => setIsOpen(false)}
            />
            <DialogTitle className="font-semibold text-[22px] text-center pb-8">
              Changer d'email
            </DialogTitle>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="newEmail" className="font-normal text-darkGrey">
                  Nouvel email
                </label>
                <input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  id="newEmail"
                  placeholder="exemple@gmail.com"
                  className="w-full border-b border-gray-300 p-2 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="paswword" className="font-normal text-darkGrey">
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
              <div className="text-red-500 text-sm text-center">{error}</div>
              <div className="mt-3 w-full" onClick={handleChangeEmail}>
                <Button
                  bgColor="bg-mainColor"
                  textColor="text-white"
                  text="Modifier email"
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

export default ChangeMailModal;
