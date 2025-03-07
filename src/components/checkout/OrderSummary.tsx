import Button from "../ui/Button";

const OrderSummary = ({
  productPrice,
  serviceFees,
  shippingFees,
  totalPrice,
  button,
  handleBuy,
  isLoading,
}: {
  productPrice: number;
  serviceFees: number;
  shippingFees: number;
  totalPrice: number;
  button: boolean;
  handleBuy: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className={`w-full h-full p-6 bg-white`}>
      {/* Titre résumé de la commande */}
      <span className="text-sm text-darkGrey">Résumé de la commande</span>

      {/* Tarifs commande */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-darkGrey">Commande</span>
          <span className="text-darkGrey">{productPrice.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-darkGrey">Frais de protection acheteurs</span>
          <span className="text-darkGrey">{serviceFees.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-darkGrey">Frais de port</span>
          <span className="text-darkGrey">{shippingFees.toFixed(2)}€</span>
        </div>
      </div>

      {/* Prix total  */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="font-medium">{totalPrice.toFixed(2)}€</span>
        </div>
      </div>

      {/* Bouton valider*/}
      {button && <div className="mt-8 flex flex-col gap-3" onClick={handleBuy}>
        <Button
          text="Payer"
          bgColor="bg-[#278358]"
          textColor="text-white"
          textSize="text-base"
          loading={isLoading}
        />
      </div>}
    </div>
  );
};

export default OrderSummary;
