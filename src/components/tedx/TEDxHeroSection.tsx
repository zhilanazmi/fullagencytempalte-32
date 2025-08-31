import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TEDxHeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "IDEAS WORTH SPREADING";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const scrollToTickets = () => {
    const element = document.getElementById("tickets");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-tedx-black flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-tedx-red/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* TEDx ITENAS Logo/Title */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-white">TED</span>
            <span className="text-tedx-red">x</span>
            <span className="text-white">ITENAS</span>
          </motion.h1>

          {/* Typing Animation Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="h-20 flex items-center justify-center"
          >
            <h2 className="tedx-headline text-3xl md:text-5xl lg:text-6xl min-h-[1.2em] flex items-center">
              {typedText}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="space-y-4"
          >
            <p className="text-white/80 text-xl md:text-2xl tedx-subheadline max-w-4xl mx-auto">
              Bergabunglah dengan kami dalam perjalanan menginspirasi yang akan mengubah cara pandang Andaterhadap inovasi, kreativitas, dan masa depan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-event-yellow rounded-full"></span>
                <span className="text-white">25 Januari 2025</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-event-cyan rounded-full"></span>
                <span className="text-white">Aula Institut Teknologi Nasional</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button
              onClick={scrollToTickets}
              className="tedx-cta-button text-lg px-8 py-4 rounded-full hover-scale"
            >
              DAPATKAN TIKET SEKARANG
            </Button>
            
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-tedx-black text-lg px-8 py-4 rounded-full transition-all duration-300"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              PELAJARI LEBIH LANJUT
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default TEDxHeroSection;