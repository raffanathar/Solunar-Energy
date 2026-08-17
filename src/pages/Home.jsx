import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import MobileStickyCta from '@/components/layout/MobileStickyCta';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import PackagesSection from '@/components/home/PackagesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import QuoteSection from '@/components/home/QuoteSection';
import ContactSection from '@/components/home/ContactSection';
import FaqSection from '@/components/home/FaqSection';
import StorePreviewSection from '@/components/home/StorePreviewSection';
import BlogSection from '@/components/home/BlogSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PackagesSection />
        <ProjectsSection />
        <WhyUsSection />
        <ReviewsSection />
        <QuoteSection />
        <ContactSection />
        <FaqSection />
        <StorePreviewSection />
        <BlogSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyCta />
    </div>
  );
}