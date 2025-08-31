import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Star, 
  Award, 
  Users, 
  Megaphone, 
  Camera, 
  Handshake,
  Target,
  TrendingUp,
  Globe
} from "lucide-react";

const TEDxSponsorshipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sponsorshipTiers = [
    {
      name: "TITLE SPONSOR",
      price: "50.000.000",
      icon: Crown,
      color: "tedx-red",
      bgGradient: "from-tedx-red/20 to-event-purple/10",
      popular: true,
      description: "Menjadi partner utama dengan branding maksimal dan exposure premium",
      benefits: [
        "Logo utama di semua materi promosi",
        "Naming rights untuk event",
        "Opening speech opportunity (5 menit)",
        "Premium booth location (6x6m)",
        "50 VIP tickets untuk karyawan/klien",
        "Dedicated social media campaign",
        "Logo di backdrop panggung utama",
        "Mention di semua press release",
        "Digital assets & video rights",
        "Year-round partnership opportunity"
      ],
      reach: "500+ peserta, 50k+ online audience",
      duration: "12 bulan partnership"
    },
    {
      name: "PLATINUM SPONSOR",
      price: "25.000.000",
      icon: Star,
      color: "event-cyan",
      bgGradient: "from-event-cyan/20 to-event-dark-blue/10",
      popular: false,
      description: "Partnership strategis dengan visibilitas tinggi dan engagement maksimal",
      benefits: [
        "Logo di semua materi promosi utama",
        "Premium booth location (4x4m)",
        "25 VIP tickets untuk tim",
        "Speaking slot dalam program (3 menit)",
        "Social media feature campaign",
        "Logo di stage backdrop",
        "Include in press kit",
        "Digital marketing collaboration",
        "Post-event networking access",
        "6 bulan extended partnership"
      ],
      reach: "500+ peserta, 30k+ online audience",
      duration: "6 bulan partnership"
    },
    {
      name: "GOLD SPONSOR",
      price: "15.000.000",
      icon: Award,
      color: "event-yellow",
      bgGradient: "from-event-yellow/20 to-event-cyan/10",
      popular: false,
      description: "Paket ideal untuk brand awareness dan community engagement",
      benefits: [
        "Logo di materi promosi terpilih",
        "Standard booth (3x3m)",
        "15 Regular tickets untuk tim",
        "Brand mention dalam program",
        "Social media recognition",
        "Networking session access",
        "Digital assets sharing",
        "Newsletter feature",
        "Community access",
        "3 bulan partnership"
      ],
      reach: "500+ peserta, 20k+ online audience",
      duration: "3 bulan partnership"
    },
    {
      name: "SILVER SPONSOR",
      price: "7.500.000",
      icon: Megaphone,
      color: "event-purple",
      bgGradient: "from-event-purple/20 to-event-dark-blue/10",
      popular: false,
      description: "Entry level sponsorship dengan exposure yang signifikan",
      benefits: [
        "Logo di website & program booklet",
        "Booth space (2x2m)",
        "10 Regular tickets",
        "Social media mention",
        "Networking opportunity",
        "Digital recognition",
        "Community newsletter feature",
        "Event documentation access"
      ],
      reach: "500+ peserta, 15k+ online audience",
      duration: "Event period"
    }
  ];

  const partnershipOpportunities = [
    {
      icon: Users,
      title: "Community Partnership",
      description: "Kolaborasi jangka panjang dengan komunitas ITENAS dan TEDx Indonesia",
      benefits: ["Access to student network", "Research collaboration", "Talent recruitment"]
    },
    {
      icon: Camera,
      title: "Media Partnership",
      description: "Partnership media untuk coverage dan dokumentasi profesional",
      benefits: ["Content collaboration", "Press coverage", "Digital media exposure"]
    },
    {
      icon: Handshake,
      title: "Strategic Partnership",
      description: "Kemitraan strategis untuk inovasi dan pengembangan program",
      benefits: ["Product development", "Innovation labs", "Knowledge sharing"]
    }
  ];

  const sponsorLogos = [
    "Company A", "Company B", "Company C", "Company D", 
    "Company E", "Company F", "Company G", "Company H"
  ];

  return (
    <section id="sponsorship" className="py-20 bg-gradient-to-b from-tedx-black to-muted/20">
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
            SPONSORSHIP & PARTNERSHIP
          </h2>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-6"></div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto tedx-subheadline">
            Bergabunglah dengan kami dalam menyebarkan ide-ide inspiratif dan bangun koneksi bermakna dengan komunitas inovator
          </p>
        </motion.div>

        {/* Why Partner With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-tedx-red/10 to-event-purple/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center event-title">
              Why Partner With TEDxITENAS?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-tedx-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-tedx-red" />
                </div>
                <h4 className="text-white font-bold mb-2 event-title">Targeted Audience</h4>
                <p className="text-white/80 text-sm event-text">
                  Reach 500+ innovators, entrepreneurs, and thought leaders in tech community
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-event-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-event-cyan" />
                </div>
                <h4 className="text-white font-bold mb-2 event-title">Brand Growth</h4>
                <p className="text-white/80 text-sm event-text">
                  Enhance brand visibility and association with innovation & excellence
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-event-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-event-yellow" />
                </div>
                <h4 className="text-white font-bold mb-2 event-title">Global Network</h4>
                <p className="text-white/80 text-sm event-text">
                  Connect with international TEDx network and global community
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sponsorship Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {sponsorshipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-tedx-red text-white px-4 py-1 text-sm font-bold">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <Card className={`bg-gradient-to-br ${tier.bgGradient} border-white/20 hover-scale cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-${tier.color}/20 h-full ${
                tier.popular ? 'ring-2 ring-tedx-red/50' : ''
              }`}>
                <CardHeader className="relative overflow-hidden text-center pb-4">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-${tier.color}/20 rounded-full blur-xl`}></div>
                  
                  <div className="relative z-10 mb-4">
                    <div className={`w-16 h-16 bg-${tier.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <tier.icon className={`w-8 h-8 text-${tier.color}`} />
                    </div>
                  </div>

                  <CardTitle className="relative z-10">
                    <div className={`text-${tier.color} text-2xl font-bold mb-2 event-title`}>
                      {tier.name}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Rp {tier.price}
                    </div>
                    <p className="text-white/80 text-sm event-text">
                      {tier.description}
                    </p>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 gap-3 p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 text-white/90">
                      <Users className="w-4 h-4 text-event-cyan" />
                      <span className="text-sm event-text">{tier.reach}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <svg className="w-4 h-4 text-event-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm event-text">{tier.duration}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold event-title">Partnership Benefits:</h4>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3 text-white/90">
                          <div className={`w-2 h-2 bg-${tier.color} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-sm event-text">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      className={`w-full font-bold uppercase tracking-wider transition-all duration-300 py-3 ${
                        tier.popular 
                          ? 'tedx-cta-button hover-scale' 
                          : `bg-${tier.color}/20 text-${tier.color} border border-${tier.color}/50 hover:bg-${tier.color} hover:text-white`
                      }`}
                    >
                      PARTNER WITH US
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partnership Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center event-title">
            OTHER PARTNERSHIP OPPORTUNITIES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipOpportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover-scale cursor-pointer transition-all duration-500 hover:shadow-xl h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-tedx-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <opportunity.icon className="w-8 h-8 text-tedx-red" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3 event-title">
                      {opportunity.title}
                    </h4>
                    <p className="text-white/80 text-sm mb-4 event-text">
                      {opportunity.description}
                    </p>
                    <div className="space-y-2">
                      {opportunity.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2 text-white/70 text-sm">
                          <div className="w-1.5 h-1.5 bg-tedx-red rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center event-title">
            OUR PARTNERS
          </h3>
          
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {sponsorLogos.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="aspect-square bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <span className="text-white/60 text-sm font-medium text-center">
                    {company}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-tedx-red/20 to-event-purple/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 event-title">
              Ready to Make an Impact?
            </h3>
            <p className="text-white/80 mb-6 event-text text-lg max-w-2xl mx-auto">
              Bergabunglah dengan kami dalam misi menyebarkan ide-ide yang dapat mengubah dunia. 
              Hubungi tim partnerships kami untuk diskusi lebih lanjut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="tedx-cta-button text-lg px-8 py-4 hover-scale">
                <Handshake className="w-5 h-5 mr-2" />
                PARTNERSHIP INQUIRY
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-tedx-black text-lg px-8 py-4 transition-all duration-300"
              >
                DOWNLOAD PARTNERSHIP DECK
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TEDxSponsorshipSection;