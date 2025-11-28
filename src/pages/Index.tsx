import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import HeroVideoMask from "@/components/HeroVideoMask";
import PersonalStory from "@/components/PersonalStory";
import VinhVlogs from "@/components/VinhVlogs";
import ScrollytellingRoadmap from "@/components/ScrollytellingRoadmap";
import TourPackages from "@/components/TourPackages";
import LandCruiseExperience from "@/components/LandCruiseExperience";
import ComparisonTable from "@/components/ComparisonTable";
import SocialProof from "@/components/SocialProof";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingZalo from "@/components/FloatingZalo";

const Index = () => {
  return (
    <SmoothScroll>
      <SEOHead />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">
        <HeroVideoMask />
        <PersonalStory />
        <VinhVlogs />
        <ScrollytellingRoadmap />
        <ComparisonTable />
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
