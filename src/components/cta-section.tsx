import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const CTASection = () => {
  return <section className="w-full px-4 md:px-16 py-14 md:py-20 overflow-hidden relative" style={{
    backgroundImage: `url('/lovable-uploads/f7a614f1-ce89-4d1e-a95e-ab971552c3ca.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-16 md:gap-20">
        <div className="max-w-3xl flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-6">
            <h2 className="max-w-[606px] text-center text-white text-3xl md:text-5xl font-normal capitalize leading-tight md:leading-[48px]">Need To Discuss Before Starting?</h2>
            <p className="max-w-[442px] text-center text-[#7D8187] text-lg md:text-xl font-normal leading-7 md:leading-7">Book a 15-minute free call with me</p>
          </div>
          <div className="pt-4">
            <a href="https://calendly.com/viktoroddy/30min" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-6 py-3 rounded-full border-[#404040] bg-transparent text-white text-sm font-mono font-normal uppercase tracking-[1.4px] hover:bg-white/10 transition-colors">
                Book an Intro Call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;