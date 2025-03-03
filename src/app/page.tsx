"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import NewsFeed from "@/components/homepage/NewsFeed";



export default function Home() {

  return (
    <div>
      <Header />
      <HeroSection />
      <NewsFeed />
      <Footer/>
    </div>
  );
}
