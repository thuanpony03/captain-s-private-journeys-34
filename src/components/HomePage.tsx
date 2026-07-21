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
import LatestStories from "@/components/LatestStories";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import ContactFormPopup from "@/components/ContactFormPopup";
import Footer from "@/components/Footer";
import FloatingZalo from "@/components/FloatingZalo";
import FloatingContacts from "@/components/FloatingContacts";
import type { BlogPostSummary } from "@/lib/blog";

const HomePage = ({ latestPosts = [] }: { latestPosts?: BlogPostSummary[] }) => (
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
      <LatestStories posts={latestPosts} />
      <ContactForm />
      <FaqSection />
      <Footer />
      <FloatingZalo />
      <FloatingContacts />
    </main>
  </SmoothScroll>
);

export default HomePage;
