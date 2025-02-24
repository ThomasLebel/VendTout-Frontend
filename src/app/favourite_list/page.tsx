import Header from "@/components/header/Header";
import FavoriteFeed from "@/components/favourite_list/FavoriteFeed";

const favourite_list = () => {
  return (
    <div>
      <Header />
      <div className="pt-32">
        <FavoriteFeed />
      </div>
    </div>
  );
};

export default favourite_list;
