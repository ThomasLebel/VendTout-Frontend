

import Header from "@/components/header/Header";
import OrderItem from "@/components/orders/OrderItem";



const orders = () => {
  return (
    <div>
      <Header />
      <div className="pt-32 w-full flex flex-col items-center">
        <div className="mt-5 max-w-screen-xl w-full flex flex-col items-center p-6 lg:p-0">
          <h1 className="text-xl font-semibold">Mes commandes</h1>

          {/* Sections boutons */}
          <div className="w-full p-4 mt-10 border border-gray-200 rounded-t-lg flex gap-4">
            <div className="py-1 px-5 border rounded-2xl">
              <span className="text-sm">Achats</span>
            </div>
            <div className="py-1 px-5 border rounded-2xl">
              <span className="text-sm">Ventes</span>
            </div>
          </div>

          {/* Sections commandes */}
          <div className="w-full border-t-0 border border-gray-200 rounded-b-lg flex flex-col">
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default orders;
