import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/home/Hero";
import VehicleSearch from "@/components/home/VehicleSearch";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import SellCta from "@/components/home/SellCta";
import BrandLogos from "@/components/home/BrandLogos";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandLogos />
      <VehicleSearch />
      <FeaturedVehicles />
      <WhyUs />
      <HowItWorks />
      <SellCta />
    </>
  );
}
