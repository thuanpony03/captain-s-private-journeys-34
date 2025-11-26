import HeroSection from "@/components/HeroSection";
import PersonalStory from "@/components/PersonalStory";
import ComparisonTable from "@/components/ComparisonTable";
import LandCruiseExperience from "@/components/LandCruiseExperience";
import SocialProof from "@/components/SocialProof";
import TourPackages from "@/components/TourPackages";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingZalo from "@/components/FloatingZalo";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PersonalStory />
      <ComparisonTable />
      <LandCruiseExperience />
      <SocialProof />
      <TourPackages />
      <ContactForm />
      <Footer />
      <FloatingZalo />
    </main>
  );
};

export default Index;
