"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/redux/store";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MemberInfos from "@/components/member/MemberInfos";
import PostedProductsFeed from "@/components/member/PostedProductsFeed";
import { ProductType } from "@/types/ProductType";

const Member = ({ params }: { params: Promise<{ pseudo: string }> }) => {
  const { pseudo } = use(params);
  const user = useAppSelector((state) => state.user.value);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [ownProfile, setOwnProfile] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [userInfos, setUserInfos] = useState<{
    username: string;
    profilePicture: string;
    country: string;
    city: string;
    aboutDescription: string;
  }>({
    username: "",
    profilePicture: "",
    country: "",
    city: "",
    aboutDescription: "",
  });

  const fetchUserInfoAndPostedProducts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/postedProducts/${pseudo}`
    );
    const data = await response.json();
    if (data.result) {
      if (data.userInfos.username === user.username) {
        setOwnProfile(true);
      }
      const filteredProducts = data.products.filter((product : ProductType) => product.isSold === false)
      setProducts(filteredProducts);
      setUserInfos(data.userInfos);
    }
  };

  useEffect(() => {
    fetchUserInfoAndPostedProducts();
  }, [refresh, user]);

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto">
      <Header />
      <div className="mt-24 p-12">
        <MemberInfos userInfos={userInfos} />
        <PostedProductsFeed
          products={products}
          ownProfile={ownProfile}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Member;
