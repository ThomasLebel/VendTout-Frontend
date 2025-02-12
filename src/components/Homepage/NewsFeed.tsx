import ProductCard from "../ui/ProductCard";

const NewsFeed = () => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-semibold mb-5">Fil d'actu</h1>
        <div className="flex flex-wrap justify-start ">
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <ProductCard />
          </div>
        </div>
    </div>
  );
};

export default NewsFeed;
