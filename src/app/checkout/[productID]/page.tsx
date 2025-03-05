"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import OrderSummary from "@/components/checkout/OrderSummary";
import ArticleInformations from "@/components/checkout/ArticleInformations";
import ShippingAdress from "@/components/checkout/ShippingAdress";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import Payment from "@/components/checkout/Payment";
import Button from "@/components/ui/Button";

import NewOrder from "@/components/checkout/NewOrder";

import { ProductType } from "@/types/ProductType";
import { ProductDefaultValues } from "@/types/ProductType";

import { useAppSelector } from "@/app/redux/store";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const Checkout = ({ params }: { params: Promise<{ productID: string }> }) => {
  
  const { productID } = use(params);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.value);

  const [product, setProduct] = useState<ProductType>(ProductDefaultValues);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [serviceFees, setServiceFees] = useState<number>(0);
  const [shippingFees, setShippingFees] = useState<number>(2.88);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit card");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setProduct(data.productInfos);
          setProductPrice(data.productInfos.price);
          setServiceFees(data.productInfos.price * 0.05 + 0.7);
        }
      });
  }, []);

  useEffect(() => {
    setTotalPrice(productPrice + serviceFees + shippingFees);
  }, [productPrice, serviceFees, shippingFees]);

  const handleBuy = async () => {
    if (user.username) {
      const result = await NewOrder(
        productID,
        user.username,
        product.userID.username,
        totalPrice,
        productPrice,
        paymentMethod
      );
      if (result){
        router.push(`/inbox/${result}`)
      }

    }
  };

  return (
    <div>
      <Header />
      <div className="pt-32 pb-24 w-full min-h-screen bg-lightGrey flex flex-col items-center">
        <div className="w-full max-w-screen-xl flex justify-between">
          {/* Section commande */}
          <div className="w-full lg:w-[68%] flex flex-col gap-8 p-4">
            {/* Section résumé de la commande mobile */}
            <div className="w-full h-full block lg:hidden">
              <OrderSummary
                productPrice={productPrice}
                serviceFees={serviceFees}
                shippingFees={shippingFees}
                totalPrice={totalPrice}
                button={false}
                handleBuy={handleBuy}
              />
            </div>
            {/* Infos Article */}
            <ArticleInformations
              productID={productID}
              title={product.title}
              condition={product.condition}
              brand={product.brand}
              price={productPrice}
              photos={product.photos}
            />
            {/* Adresse de livraison */}
            <ShippingAdress
              fullName={user.shippingAddress?.fullName}
              street={user.shippingAddress?.street}
              zipCode={user.shippingAddress?.zipCode}
              city={user.shippingAddress?.city}
            />
            {/* Méthode de livraison */}
            <ShippingMethod
              shippingFees={shippingFees}
              setShippingFees={setShippingFees}
            />
            {/* Méthode de paiement */}
            <Payment
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            {/* Bouton acheter mobile*/}
            <div className="w-full bg-white p-6 block lg:hidden">
              <Button
                text="Payer"
                bgColor="bg-[#278358]"
                textColor="text-white"
                textSize="text-base"
                wfull={true}
              />
            </div>
          </div>
          {/* Section résumé de la commande desktop */}
          <div className="w-[35%] h-full hidden lg:block p-4">
            <OrderSummary
              productPrice={productPrice}
              serviceFees={serviceFees}
              shippingFees={shippingFees}
              totalPrice={totalPrice}
              button={true}
              handleBuy={handleBuy}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
