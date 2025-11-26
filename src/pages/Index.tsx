import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import HeroVideoMask from "@/components/HeroVideoMask";
import PersonalStory from "@/components/PersonalStory";
import ScrollytellingRoadmap from "@/components/ScrollytellingRoadmap";
import ParallaxShowcase from "@/components/ParallaxShowcase";
import ComparisonTable from "@/components/ComparisonTable";
import HorizontalGallery from "@/components/HorizontalGallery";
import LandCruiseExperience from "@/components/LandCruiseExperience";
import SocialProof from "@/components/SocialProof";
import TourPackages from "@/components/TourPackages";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingZalo from "@/components/FloatingZalo";

const Index = () => {
  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="min-h-screen">
        <HeroVideoMask />
        <PersonalStory />
        <ScrollytellingRoadmap />
        <ParallaxShowcase />
        <ComparisonTable />
        <HorizontalGallery />
        <LandCruiseExperience />
        <SocialProof />
        <TourPackages />
        <ContactForm />
        <Footer />
        <FloatingZalo />
      </main>
    </SmoothScroll>
  );
};

export default Index;
