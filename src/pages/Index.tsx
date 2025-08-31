
import { usePageMeta } from '@/hooks/use-page-meta';
import TEDxNavbar from "@/components/tedx/TEDxNavbar";
import TEDxHeroSection from "@/components/tedx/TEDxHeroSection";
import TEDxAboutSection from "@/components/tedx/TEDxAboutSection";
import TEDxEventSection from "@/components/tedx/TEDxEventSection";
import TEDxTicketsSection from "@/components/tedx/TEDxTicketsSection";
import TEDxMerchandiseSection from "@/components/tedx/TEDxMerchandiseSection";
import TEDxSponsorshipSection from "@/components/tedx/TEDxSponsorshipSection";
import TEDxFAQSection from "@/components/tedx/TEDxFAQSection";
import TEDxFooter from "@/components/tedx/TEDxFooter";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const Index = () => {
  usePageMeta({
    title: "TEDxITENAS - Ideas Worth Spreading | Institut Teknologi Nasional",
    description: "Bergabunglah dengan TEDxITENAS 2025 untuk mendengarkan ide-ide inspiratif dari pembicara terpilih. Event technology, innovation, dan entrepreneurship terbesar di ITENAS.",
    keywords: "TEDxITENAS, TEDx, ITENAS, ideas worth spreading, technology, innovation, entrepreneurship, Bandung event, inspiring talks",
    canonical: "https://tedxitenas.com/",
    ogImage: "https://tedxitenas.com/tedx-og-image.jpg"
  });

  return (
    <div className="min-h-screen bg-tedx-black">
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="website" />
      
      <TEDxNavbar />
      <main>
        <TEDxHeroSection />
        <TEDxAboutSection />
        <TEDxEventSection />
        <TEDxTicketsSection />
        <TEDxMerchandiseSection />
        <TEDxSponsorshipSection />
        <TEDxFAQSection />
      </main>
      <TEDxFooter />
    </div>
  );
};

export default Index;
