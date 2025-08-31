
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { usePageMeta } from '@/hooks/use-page-meta';


import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import { AnimatedGallerySection } from "@/components/animated-gallery-section";
import BenefitsSection from "@/components/benefits-section";
import PortfolioSection from "@/components/portfolio-section";
import ProjectCalculatorSection from "@/components/project-calculator-section";
import ContactFormSection from "@/components/contact-form-section";

import ProductsSection from "@/components/products-section";


import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const Index = () => {
  usePageMeta({
    title: "Agency Template - Premium Web Design & Development",
    description: "Professional agency template for web design and development services. Modern, responsive template perfect for creative agencies, studios, and freelancers.",
    keywords: "agency template, web design, development services, creative agency, portfolio template, business website, responsive design, modern template",
    canonical: "https://webfluin.com/",
    ogImage: "https://webfluin.com/lovable-uploads/ae0159e8-2fca-4946-87a4-a6a4677506b0.png"
  });
  
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="website" />
      
      
      <Navbar user={user} onSignOut={handleSignOut} />
      <main>
        <HeroSection />
        <AnimatedGallerySection />
        <BenefitsSection />
        <PortfolioSection />
        <ProjectCalculatorSection />
        <ContactFormSection />
        <ProductsSection />
        
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
