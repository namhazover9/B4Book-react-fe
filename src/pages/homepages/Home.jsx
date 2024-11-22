import React from "react";
import Card from "@components/Card";
import { useLocalization } from "../../context/LocalizationWrapper";
import { Select } from "antd";
import CategorySlider from "./CategorySlider";
import DiscountBanners from "./DiscountBanner";
import TopVendor from "./Topvendor";
import Bestseller from "./BestSelling";
import Trending from "./Trending";
import BannerSlider from "./BannerSlider";
import FavouriteBook from "./FavouriteBook";
import Post from "./Post";
import Banner from "./Banner";
import LogoShopbook from "./LogoShopbook";
import GalleryImage from "./GalleryImage";
import LogoGallery from "./LogoGallery";

export default function Home() {
  // testBackendConnection();
  return (
    <div className="flex flex-col gap-y-4">
      
      <BannerSlider />
      <CategorySlider />
      <DiscountBanners />
      <TopVendor />
      <FavouriteBook />
      <Trending />
      <Bestseller />
      <Post />
      <LogoShopbook/>
      <Banner/>
      <GalleryImage/>
      <LogoGallery/>
    </div>
  );
}
