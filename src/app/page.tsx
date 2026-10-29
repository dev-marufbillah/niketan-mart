import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import SeasonalBanner from "@/components/home/SeasonalBanner";
import FlashDeals from "@/components/home/FlashDeals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import RestaurantPartners from "@/components/home/RestaurantPartners";
import DeliveryChecker from "@/components/home/DeliveryChecker";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Categories />
      <SeasonalBanner />
      <FlashDeals />
      <FeaturedProducts />
      <RestaurantPartners />
      <DeliveryChecker />
      <Testimonials />
    </main>
  );
}