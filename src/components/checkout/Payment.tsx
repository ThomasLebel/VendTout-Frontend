import { CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

const Payment = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full p-6 bg-white">
      <span className="text-sm text-darkGrey">Paiements</span>
      <div className="mt-6">
        <div
          className="flex justify-between items-center p-4 border rounded-t-lg border-gray-200  cursor-pointer"
          onClick={() => setPaymentMethod("credit card")}
        >
          <div className="flex gap-2">
            <CreditCardIcon className="h-6 w-6" />

            <span>Carte de crédit</span>
          </div>
          <div
            className={`w-6 h-6 rounded-full border border-mainColor flex justify-center items-center ${
              paymentMethod === "credit card" && "bg-mainColor"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>

        <div
          className="flex justify-between items-center p-4 border rounded-b-lg border-gray-200 cursor-pointer"
          onClick={() => setPaymentMethod("paypal")}
        >
          <div className="flex gap-2">
            <WalletIcon className="h-6 w-6" />
            <span>Paypal</span>
          </div>
          <div
            className={`w-6 h-6 rounded-full border border-mainColor flex justify-center items-center ${
              paymentMethod === "paypal" && "bg-mainColor"
            } `}
          >
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
