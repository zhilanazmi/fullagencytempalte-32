import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TEDxAboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-tedx-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-tedx-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-event-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2 
                className="tedx-headline text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                TENTANG TEDX<span className="text-white">ITENAS</span>
              </motion.h2>
              
              <motion.div
                className="w-24 h-1 bg-tedx-red"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.div>
            </div>

            <motion.div
              className="space-y-6 text-white/90 tedx-subheadline text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                TEDxITENAS adalah acara independen yang diselenggarakan di bawah lisensi TED, 
                yang bertujuan untuk menyebarkan ide-ide inspiratif dan inovatif dari komunitas 
                Institut Teknologi Nasional.
              </p>
              
              <p>
                Dengan tema <span className="text-event-yellow font-semibold">"Ideas Worth Spreading"</span>, 
                kami menghadirkan pembicara terpilih yang akan berbagi wawasan, pengalaman, dan 
                visi mereka untuk masa depan yang lebih baik.
              </p>
              
              <p>
                Bergabunglah dengan kami dalam perjalanan transformatif ini, di mana setiap 
                ide memiliki kekuatan untuk mengubah dunia.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-event-yellow mb-2">500+</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">Peserta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-event-cyan mb-2">12</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">Pembicara</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-tedx-red/20 to-event-cyan/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              {/* Placeholder for event image */}
              <div className="aspect-square bg-gradient-to-br from-tedx-red/30 to-event-purple/30 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl font-bold text-white/20">TED<span className="text-tedx-red/40">x</span></div>
                  <div className="text-white/60 text-xl">ITENAS 2025</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-event-yellow/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-event-purple/20 rounded-full blur-xl"></div>
            </div>

            {/* Featured Quote */}
            <motion.div
              className="absolute -bottom-8 left-8 right-8 bg-tedx-black/90 backdrop-blur-sm border border-tedx-red/30 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="text-tedx-red text-4xl font-bold mb-2">"</div>
              <p className="text-white/90 italic mb-2 promo-text">
                The power of ideas to change attitudes, lives and, ultimately, the world.
              </p>
              <div className="text-white/60 text-sm">- TED</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TEDxAboutSection;