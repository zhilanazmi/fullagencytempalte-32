import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";

const TEDxTicketsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ticketTypes = [
    {
      name: "EARLY BIRD",
      price: "150.000",
      originalPrice: "200.000",
      discount: "25%",
      icon: Zap,
      popular: false,
      description: "Perfect untuk yang ingin merasakan pengalaman TEDx dengan harga terjangkau",
      features: [
        "Akses ke Main Event (25 Jan)",
        "Welcome Kit & Merchandise",
        "Lunch & Coffee Break",
        "Certificate of Attendance",
        "Networking Session",
        "Digital Access ke Recording"
      ],
      color: "event-yellow",
      bgGradient: "from-event-yellow/10 to-event-cyan/5",
      buttonText: "PILIH EARLY BIRD"
    },
    {
      name: "REGULAR",
      price: "200.000",
      originalPrice: null,
      discount: null,
      icon: Star,
      popular: true,
      description: "Paket lengkap untuk pengalaman TEDx yang optimal",
      features: [
        "Akses ke Main Event (25 Jan)",
        "Welcome Kit & Premium Merchandise",
        "Lunch & Coffee Break Premium",
        "Certificate of Attendance",
        "Networking Session Extended",
        "Digital Access ke Recording",
        "Workshop Access (terbatas)",
        "Meet & Greet Session"
      ],
      color: "tedx-red",
      bgGradient: "from-tedx-red/20 to-event-purple/10",
      buttonText: "PILIH REGULAR"
    },
    {
      name: "VIP",
      price: "350.000",
      originalPrice: null,
      discount: null,
      icon: Crown,
      popular: false,
      description: "Pengalaman premium eksklusif dengan akses penuh ke semua acara",
      features: [
        "Akses ke Pre-Event (20 Jan)",
        "Akses ke Main Event (25 Jan)",
        "VIP Seating (baris depan)",
        "Exclusive Welcome Kit",
        "Premium Lunch & Refreshments",
        "Certificate of Attendance",
        "Extended Networking Session",
        "Meet & Greet dengan Speakers",
        "Digital Access ke Recording",
        "Workshop Access (unlimited)",
        "Exclusive After Party"
      ],
      color: "event-purple",
      bgGradient: "from-event-purple/20 to-event-dark-blue/10",
      buttonText: "PILIH VIP"
    }
  ];

  return (
    <section id="tickets" className="py-20 bg-gradient-to-b from-muted/20 to-tedx-black">
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
            TICKETS & PRICING
          </h2>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-6"></div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto tedx-subheadline">
            Pilih paket yang sesuai dengan kebutuhan Anda dan bergabunglah dalam perjalanan inspiratif ini
          </p>
          
          {/* Early Bird Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-3 bg-event-yellow/20 border border-event-yellow/30 rounded-full px-6 py-3"
          >
            <Zap className="w-5 h-5 text-event-yellow" />
            <span className="text-event-yellow font-semibold">Early Bird berakhir dalam 15 hari!</span>
          </motion.div>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ticketTypes.map((ticket, index) => (
            <motion.div
              key={ticket.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Popular Badge */}
              {ticket.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-tedx-red text-white px-4 py-1 text-sm font-bold">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <Card className={`bg-gradient-to-br ${ticket.bgGradient} border-white/20 hover-scale cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-${ticket.color}/20 h-full ${
                ticket.popular ? 'ring-2 ring-tedx-red/50' : ''
              }`}>
                <CardHeader className="relative overflow-hidden text-center pb-4">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-${ticket.color}/20 rounded-full blur-xl`}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div className={`w-16 h-16 bg-${ticket.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <ticket.icon className={`w-8 h-8 text-${ticket.color}`} />
                    </div>
                  </div>

                  <CardTitle className="relative z-10">
                    <div className={`text-${ticket.color} text-2xl font-bold mb-2 event-title`}>
                      {ticket.name}
                    </div>
                    
                    {/* Price */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl md:text-4xl font-bold text-white">
                          Rp {ticket.price}
                        </span>
                        {ticket.discount && (
                          <Badge className="bg-event-yellow text-tedx-black font-bold">
                            -{ticket.discount}
                          </Badge>
                        )}
                      </div>
                      
                      {ticket.originalPrice && (
                        <div className="text-white/50 line-through text-lg">
                          Rp {ticket.originalPrice}
                        </div>
                      )}
                    </div>
                  </CardTitle>
                  
                  <p className="text-white/80 text-sm event-text mt-4">
                    {ticket.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {ticket.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3 text-white/90">
                        <Check className={`w-5 h-5 text-${ticket.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm event-text">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      className={`w-full font-bold uppercase tracking-wider transition-all duration-300 py-3 ${
                        ticket.popular 
                          ? 'tedx-cta-button hover-scale' 
                          : `bg-${ticket.color}/20 text-${ticket.color} border border-${ticket.color}/50 hover:bg-${ticket.color} hover:text-white`
                      }`}
                    >
                      {ticket.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-tedx-red/10 to-event-purple/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 event-title">
              INFORMASI PENTING
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/80 event-text">
              <div>
                <div className="font-semibold text-event-yellow mb-2">Payment Method</div>
                <p>Transfer Bank, E-Wallet, Credit Card</p>
              </div>
              <div>
                <div className="font-semibold text-event-cyan mb-2">Refund Policy</div>
                <p>100% Refund hingga 7 hari sebelum event</p>
              </div>
              <div>
                <div className="font-semibold text-event-purple mb-2">Group Discount</div>
                <p>Diskon 15% untuk pembelian 5+ tiket</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TEDxTicketsSection;