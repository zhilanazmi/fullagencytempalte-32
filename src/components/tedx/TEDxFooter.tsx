import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const TEDxFooter = () => {
  const navigationLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Event", href: "#event" },
    { label: "Tickets", href: "#tickets" },
    { label: "Merchandise", href: "#merchandise" },
    { label: "FAQ", href: "#faq" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/tedxitenas", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/tedxitenas", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/tedxitenas", label: "YouTube" },
    { icon: Mail, href: "mailto:info@tedxitenas.com", label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-tedx-black border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-tedx-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-event-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* TEDx Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="text-4xl font-bold text-white mb-4">
                  TED<span className="text-tedx-red">x</span>ITENAS
                </h3>
                <p className="text-white/80 event-text text-lg leading-relaxed max-w-md">
                  Menyebarkan ide-ide inspiratif dan inovatif dari komunitas Institut Teknologi Nasional 
                  untuk menciptakan perubahan positif di dunia.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-event-cyan" />
                  <span className="text-sm">Institut Teknologi Nasional, Bandung</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 text-event-yellow" />
                  <span className="text-sm">info@tedxitenas.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5 text-event-purple" />
                  <span className="text-sm">+62 22 7272215</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-white font-bold text-lg uppercase tracking-wider event-title">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 hover:text-tedx-red transition-colors duration-300 text-sm event-text"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-white font-bold text-lg uppercase tracking-wider event-title">
                Follow Us
              </h4>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-tedx-red/20 hover:scale-110 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-tedx-red transition-colors" />
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <p className="text-white/70 text-sm event-text">
                  Subscribe untuk update terbaru:
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-tedx-red/50 transition-colors"
                  />
                  <button className="bg-tedx-red hover:bg-tedx-red/80 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm event-text">
              © 2025 TEDxITENAS. All rights reserved. | This independent TEDx event is operated under license from TED.
            </div>
            
            <div className="flex gap-6 text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-tedx-red hover:bg-tedx-red/80 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default TEDxFooter;