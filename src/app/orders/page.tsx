"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import OrderItem from "@/components/orders/OrderItem";

import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";

const Orders = () => {
  const user = useAppSelector((state) => state.user.value);

  interface Order {
    seller: { username: string };
    product: { _id: string; title: string; photos: string[] };
    totalPrice: number;
    sellerPrice: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Sale {
    buyer: { username: string };
    product: { _id: string; title: string; photos: string[] };
    totalPrice: number;
    sellerPrice: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [option, setOption] = useState<string>("Achats");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${user.token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setOrders(
            data.orders.sort(
              (a: Order, b: Order) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
          );
          setSales(
            data.sales.sort(
              (a: Sale, b: Sale) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
          );
        }
      });
  }, [user.token]);

  return (
    <div>
      <Header />
      <div className="pt-32 w-full flex flex-col items-center">
        <div className="mt-5 max-w-screen-xl w-full flex flex-col items-center p-6 lg:p-0 min-h-screen">
          <h1 className="text-xl font-semibold">Mes commandes</h1>

          {/* Sections boutons */}
          <div className="w-full p-4 mt-10 border border-gray-200 rounded-t-lg flex gap-4">
            <div
              className={`cursor-pointer py-1 px-5 border rounded-2xl ${
                option === "Achats" &&
                "border-mainColor bg-mainColor bg-opacity-10"
              }`}
              onClick={() => setOption("Achats")}
            >
              <span className="text-sm">Achats</span>
            </div>
            <div
              className={`cursor-pointer py-1 px-5 border rounded-2xl ${
                option === "Ventes" &&
                "border-mainColor bg-mainColor bg-opacity-10"
              }`}
              onClick={() => setOption("Ventes")}
            >
              <span className="text-sm">Ventes</span>
            </div>
          </div>

          {/* Sections commandes */}
          <div className="w-full border-t-0 border border-gray-200 rounded-b-lg flex flex-col">
            {option === "Achats" &&
              orders.length > 0 &&
              orders.map((order, i) => {
                return (
                  <OrderItem
                    key={i}
                    productTitle={order.product.title}
                    productPrice={order.totalPrice}
                    status={order.status}
                    productPhotos={order.product.photos}
                    buyerUsername={user.username}
                    sellerUsername={order.seller.username}
                    isOrder={true}
                  />
                );
              })}
            {option === "Achats" && orders.length === 0 && (
              <div className="w-full text-center text-darkGrey font-xl p-8">
                Aucune commande
              </div>
            )}
            {option === "Ventes" &&
              sales.length > 0 &&
              sales.map((sale, i) => {
                return (
                  <OrderItem
                    key={i}
                    productTitle={sale.product.title}
                    productPrice={sale.sellerPrice}
                    status={sale.status}
                    productPhotos={sale.product.photos}
                    buyerUsername={sale.buyer.username}
                    sellerUsername={user.username}
                    isOrder={false}
                  />
                );
              })}
              {option === "Ventes" && sales.length === 0 && (
              <div className="w-full text-center text-darkGrey font-xl p-8">
                Aucune vente
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
