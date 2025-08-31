import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const TEDxEventSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      id: "pre-event",
      title: "PRE-EVENT",
      subtitle: "Networking & Workshop",
      date: "20 Januari 2025",
      time: "14:00 - 17:00 WIB",
      location: "Ruang Seminar ITENAS",
      participants: "100 Peserta",
      description: "Sesi networking eksklusif dengan workshop interaktif seputar inovasi teknologi dan entrepreneurship.",
      features: [
        "Workshop Interactive Design Thinking",
        "Networking Session dengan Alumni",
        "Preview Talk dari Speaker Utama",
        "Welcome Lunch & Coffee Break"
      ],
      color: "event-dark-blue",
      bgGradient: "from-event-dark-blue/20 to-event-cyan/10"
    },
    {
      id: "main-event",
      title: "MAIN EVENT",
      subtitle: "TEDxITENAS 2025",
      date: "25 Januari 2025",
      time: "09:00 - 16:00 WIB",
      location: "Aula Institut Teknologi Nasional",
      participants: "500 Peserta",
      description: "Acara utama dengan 12 pembicara inspiratif yang akan membagikan ide-ide revolusioner tentang teknologi, kreativitas, dan masa depan.",
      features: [
        "12 Talk Inspiratif dari Expert",
        "Performance Art & Music",
        "Exhibition Corner",
        "Lunch & Networking Break",
        "Certificate & Merchandise"
      ],
      color: "tedx-red",
      bgGradient: "from-tedx-red/20 to-event-purple/10"
    }
  ];

  return (
    <section id="event" className="py-20 bg-gradient-to-b from-tedx-black to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="tedx-headline text-4xl md:text-5xl lg:text-6xl mb-4">
            EVENT TIMELINE
          </h2>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-6"></div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto tedx-subheadline">
            Dua pengalaman luar biasa yang dirancang untuk menginspirasi dan membangun koneksi bermakna
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <Card className={`bg-gradient-to-br ${event.bgGradient} border-white/10 hover-scale cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-tedx-red/20 h-full`}>
                <CardHeader className="relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${event.color}/20 rounded-full blur-2xl`}></div>
                  <CardTitle className="relative z-10">
                    <div className={`text-${event.color} text-2xl font-bold mb-2 event-title`}>
                      {event.title}
                    </div>
                    <div className="text-white/80 text-lg event-text">
                      {event.subtitle}
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Event Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <Calendar className="w-5 h-5 text-event-yellow" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Clock className="w-5 h-5 text-event-cyan" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 sm:col-span-2">
                      <MapPin className="w-5 h-5 text-event-purple" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 sm:col-span-2">
                      <Users className="w-5 h-5 text-tedx-red" />
                      <span className="text-sm">{event.participants}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 event-text leading-relaxed">
                    {event.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold event-title text-lg">Yang Akan Anda Dapatkan:</h4>
                    <ul className="space-y-2">
                      {event.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-white/80">
                          <div className={`w-2 h-2 bg-${event.color} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-sm event-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      className="w-full tedx-cta-button hover-scale"
                      onClick={() => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      DAFTAR SEKARANG
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-tedx-red/20 to-event-purple/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 event-title">
              Siap untuk Pengalaman yang Mengubah Hidup?
            </h3>
            <p className="text-white/80 mb-6 event-text text-lg max-w-2xl mx-auto">
              Bergabunglah dengan komunitas inovator, pemikir, dan pembuat perubahan. 
              Dapatkan early bird discount hingga 30%!
            </p>
            <Button 
              className="tedx-cta-button text-lg px-8 py-4 hover-scale"
              onClick={() => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })}
            >
              DAPATKAN TIKET EARLY BIRD
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TEDxEventSection;