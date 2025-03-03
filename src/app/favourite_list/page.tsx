import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import FavoriteFeed from "@/components/favourite_list/FavoriteFeed";

const favourite_list = () => {
  return (
    <div>
      <Header />
      <div className="pt-32 min-h-screen">
        <FavoriteFeed />
      </div>
      <Footer/>
    </div>
  );
};

export default favourite_list;
