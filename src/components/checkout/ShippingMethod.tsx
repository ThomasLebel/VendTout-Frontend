import { MapPinIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

const ShippingMethod = ({shippingFees, setShippingFees} : {shippingFees: number, setShippingFees: Dispatch<SetStateAction<number>>}) => {
  return (
    <div className="w-full p-6 bg-white">
      <span className="text-sm text-darkGrey">Options de livraison</span>
      <div className="mt-6">

        <div 
        className="flex justify-between items-center p-4 border rounded-t-lg border-gray-200  cursor-pointer"
        onClick={() => setShippingFees(2.88)}>
            <div className="flex gap-2">
                <MapPinIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <span>Envoi au point relais</span>
                    <span className="text-darkGrey">2,88€</span>
                </div>
            </div>
            <div className={`w-6 h-6 rounded-full border border-mainColor flex justify-center items-center ${shippingFees === 2.88 && "bg-mainColor"}`}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
        </div>

        <div 
        className="flex justify-between items-center p-4 border rounded-b-lg border-gray-200 cursor-pointer"
        onClick={() => setShippingFees(4.38)}>
            <div className="flex gap-2">
                <HomeIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <span>Envoi à domicile</span>
                    <span className="text-darkGrey">4,38€</span>
                </div>
            </div>
            <div className={`w-6 h-6 rounded-full border border-mainColor flex justify-center items-center ${shippingFees === 4.38 && "bg-mainColor"}`}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ShippingMethod;