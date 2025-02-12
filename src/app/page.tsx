"use client";

import Header from "@/components/Header/Header";
import HeroSection from "@/components/Homepage/HeroSection";
import NewsFeed from "@/components/Homepage/NewsFeed";

import { useAppSelector } from "./redux/store";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      <Header />
      <HeroSection />
      <NewsFeed />
    </div>
  );
}
