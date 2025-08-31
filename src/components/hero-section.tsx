import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const HeroSection = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="min-h-[600px] w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center gap-20 px-4 relative">
        <div className="absolute inset-0 bg-background opacity-70 z-0"></div>
        <video className="absolute inset-0 w-full h-full object-cover z-[1]" autoPlay muted loop playsInline controls={false} aria-label="Background video showcasing AI technology and web development">
          <source src="https://res.cloudinary.com/dqd4dvem7/video/upload/v1754907365/rowzd837annraukcew5z_fgftkj.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[2]" style={{background: 'linear-gradient(to top, black, transparent)'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-black rounded-full z-[8]" style={{filter: 'blur(60px)', transform: 'translateX(-50%) translateY(calc(-50% + 50px))'}}></div>
        <div className="w-full max-w-4xl flex flex-col justify-start items-center gap-6 relative z-10 pt-[150px] pb-[60px]">
          <motion.header 
            className="w-full relative flex flex-col justify-start items-center gap-6 pt-[50px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex justify-center items-center gap-2.5 mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-[7px] h-[7px] bg-green-500 rounded-full"></div>
              <div className="text-muted-foreground text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5">
                TAKING NEW PROJECTS IN AUGUST
              </div>
            </motion.div>
            <motion.div 
              className="w-full max-w-screen-2xl text-center flex flex-col justify-center items-center gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-foreground font-normal leading-tight break-words text-4xl md:text-6xl lg:text-7xl xl:text-8xl">Elevate your brand
creative excellence</span>
            </motion.div>
            <motion.div 
              className="w-full text-center flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-foreground text-base md:text-lg font-normal leading-6 break-words max-w-2xl mx-auto">Discover the most incredible creations hand-crafted to elevate your website or app and better position your brand.</p>
            </motion.div>
          </motion.header>
          <motion.div 
            className="pt-4 flex justify-start items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button variant="hero" size="lg" className="px-6 py-3 rounded-full" onClick={scrollToCalculator} aria-label="Get a free quote">
              GET A FREE QUOTE
            </Button>
            <a href="https://calendly.com/viktoroddy/30min" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="px-6 py-3 rounded-full hidden md:flex" aria-label="Book an intro call">
                BOOK AN INTRO CALL
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;