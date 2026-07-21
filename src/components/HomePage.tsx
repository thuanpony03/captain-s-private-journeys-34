"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
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
import ContactFormPopup from "@/components/ContactFormPopup";
import Footer from "@/components/Footer";
import FloatingZalo from "@/components/FloatingZalo";
import FloatingContacts from "@/components/FloatingContacts";

const HomePage = () => (
  <SmoothScroll>
    <CustomCursor />
    <Navbar />
    <ContactFormPopup />
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
      <FloatingContacts />
    </main>
  </SmoothScroll>
);

export default HomePage;
