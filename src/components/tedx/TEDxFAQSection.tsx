import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Ticket, MapPin, Users, CreditCard, Gift } from "lucide-react";

const TEDxFAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqCategories = [
    {
      icon: Ticket,
      title: "Tickets & Registration",
      color: "tedx-red",
      faqs: [
        {
          question: "Bagaimana cara membeli tiket TEDxITENAS?",
          answer: "Anda dapat membeli tiket langsung melalui website ini dengan mengklik tombol 'Get Tickets'. Pilih jenis tiket yang diinginkan, isi data diri, dan lakukan pembayaran. Konfirmasi tiket akan dikirim via email dalam 24 jam."
        },
        {
          question: "Apakah ada batas usia untuk menghadiri acara?",
          answer: "TEDxITENAS terbuka untuk semua usia. Namun, untuk peserta di bawah 17 tahun, kami menyarankan didampingi oleh orang tua atau wali. Konten acara dirancang untuk audiens dewasa muda dan profesional."
        },
        {
          question: "Bisakah saya refund tiket jika tidak bisa hadir?",
          answer: "Ya, kami menyediakan kebijakan refund 100% hingga 7 hari sebelum acara. Untuk refund dalam 3-7 hari sebelum acara, akan dikenakan biaya admin 25%. Tidak ada refund dalam 3 hari terakhir sebelum event."
        },
        {
          question: "Apakah tiket bisa dipindahtangankan?",
          answer: "Ya, tiket dapat dipindahtangankan dengan menghubungi tim kami minimal 3 hari sebelum acara. Prosedur transfer tiket memerlukan konfirmasi data pembeli baru dan biaya admin Rp 25.000."
        }
      ]
    },
    {
      icon: MapPin,
      title: "Location & Event Details",
      color: "event-cyan",
      faqs: [
        {
          question: "Di mana lokasi acara TEDxITENAS?",
          answer: "Acara akan diselenggarakan di Aula Institut Teknologi Nasional, Jl. PKH. Mustafa No.23, Neglasari, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat. Lokasi mudah diakses dengan transportasi umum dan tersedia area parkir yang luas."
        },
        {
          question: "Jam berapa acara dimulai dan berakhir?",
          answer: "Main Event dimulai pukul 09:00 WIB dengan registrasi peserta mulai 08:00 WIB. Acara berakhir sekitar pukul 16:00 WIB termasuk sesi networking. Pre-Event dijadwalkan pada 20 Januari 2025, pukul 14:00-17:00 WIB."
        },
        {
          question: "Apakah tersedia transportasi atau shuttle?",
          answer: "Saat ini belum tersedia shuttle khusus. Namun, lokasi mudah dijangkau dengan berbagai moda transportasi. Kami akan menyediakan panduan detail akses transportasi dan peta lokasi untuk peserta."
        },
        {
          question: "Bagaimana dress code untuk acara ini?",
          answer: "Dress code adalah smart casual atau business casual. Kami mendorong peserta untuk berpakaian nyaman namun tetap profesional. Hindari sandal jepit, kaos oblong, dan pakaian terlalu santai."
        }
      ]
    },
    {
      icon: Users,
      title: "Event Experience",
      color: "event-yellow",
      faqs: [
        {
          question: "Siapa saja pembicara yang akan hadir?",
          answer: "Kami akan menghadirkan 12 pembicara inspiratif dari berbagai bidang seperti teknologi, entrepreneurship, seni, dan inovasi sosial. Daftar lengkap pembicara akan diumumkan secara bertahap melalui website dan media sosial kami."
        },
        {
          question: "Apakah ada sesi networking atau tanya jawab?",
          answer: "Ya! Setiap sesi talk akan dilengkapi dengan sesi tanya jawab. Selain itu, tersedia dedicated networking session selama coffee break dan lunch break. VIP ticket holder mendapat akses extended networking dengan para pembicara."
        },
        {
          question: "Apakah acara akan direkam atau ada live streaming?",
          answer: "Seluruh talk akan direkam dengan kualitas profesional dan akan tersedia di channel YouTube TEDx setelah event. Live streaming tersedia untuk limited audience. Recording access termasuk dalam semua jenis tiket."
        },
        {
          question: "Bahasa apa yang digunakan dalam presentasi?",
          answer: "Mayoritas presentasi menggunakan Bahasa Indonesia dengan beberapa sesi dalam Bahasa Inggris. Untuk sesi berbahasa Inggris, kami akan menyediakan subtitle atau summary dalam Bahasa Indonesia."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Pricing",
      color: "event-purple",
      faqs: [
        {
          question: "Metode pembayaran apa saja yang tersedia?",
          answer: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana, ShopeePay), dan credit card (Visa, Mastercard). Semua pembayaran diproses dengan sistem yang aman."
        },
        {
          question: "Apakah ada diskon untuk mahasiswa atau group?",
          answer: "Ya! Mahasiswa mendapat diskon 15% dengan menunjukkan KTM yang masih aktif. Group discount 15% berlaku untuk pembelian 5+ tiket sekaligus. Early bird discount hingga 25% tersedia hingga akhir Desember 2024."
        },
        {
          question: "Kapan deadline pembelian tiket?",
          answer: "Penjualan tiket berakhir 3 hari sebelum event atau ketika kuota penuh (yang lebih dulu tercapai). Namun, kami sangat menyarankan untuk membeli segera karena early bird pricing terbatas dan sangat diminati."
        },
        {
          question: "Apakah harga sudah termasuk pajak dan biaya admin?",
          answer: "Harga yang tertera sudah termasuk PPN 11%. Biaya admin payment gateway (1-3%) akan ditambahkan saat checkout tergantung metode pembayaran yang dipilih. Total biaya akan ditampilkan jelas sebelum konfirmasi pembayaran."
        }
      ]
    },
    {
      icon: Gift,
      title: "Merchandise & Benefits",
      color: "event-dark-blue",
      faqs: [
        {
          question: "Apa saja yang didapat dalam welcome kit?",
          answer: "Welcome kit berisi TEDx notebook, pulpen eksklusif, sticker pack, name tag, lanyard, dan surprise merchandise lainnya. VIP ticket mendapat welcome kit premium dengan bonus exclusive merchandise yang tidak dijual terpisah."
        },
        {
          question: "Bisakah membeli merchandise tanpa membeli tiket?",
          answer: "Ya, merchandise tersedia untuk pembelian terpisah melalui section merchandise di website ini. Namun, beberapa item eksklusif hanya tersedia untuk pemegang tiket atau dalam jumlah sangat terbatas."
        },
        {
          question: "Apakah ada certificate untuk peserta?",
          answer: "Ya, semua peserta akan mendapat digital certificate of attendance yang dapat didownload setelah event selesai. Certificate dapat digunakan untuk keperluan professional development atau portfolio."
        },
        {
          question: "Bagaimana dengan catering dan konsumsi?",
          answer: "Lunch dan coffee break sudah termasuk dalam tiket. Menu disediakan dengan pilihan vegetarian dan halal. Untuk dietary restrictions khusus, mohon informasikan saat registrasi atau hubungi tim kami sebelum event."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-muted/20 to-tedx-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-12 h-12 text-tedx-red" />
            <h2 className="tedx-headline text-4xl md:text-5xl lg:text-6xl">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-6"></div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto tedx-subheadline">
            Temukan jawaban atas pertanyaan umum seputar TEDxITENAS. Masih ada pertanyaan? Hubungi tim kami!
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 bg-${category.color}/20 rounded-full flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 text-${category.color}`} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white event-title">
                  {category.title}
                </h3>
              </div>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`item-${categoryIndex}-${faqIndex}`}
                    className="bg-white/5 rounded-lg border-white/10 px-6"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-tedx-red transition-colors duration-300 event-text text-lg font-semibold py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 event-text leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-tedx-red/20 to-event-purple/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 event-title">
              Masih Ada Pertanyaan?
            </h3>
            <p className="text-white/80 mb-6 event-text text-lg max-w-2xl mx-auto">
              Tim kami siap membantu Anda! Jangan ragu untuk menghubungi kami melalui email atau media sosial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@tedxitenas.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-tedx-red hover:bg-tedx-red/80 text-white font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover-scale"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                EMAIL US
              </a>
              <a
                href="https://wa.me/6282272215"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-event-cyan hover:bg-event-cyan/80 text-tedx-black font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover-scale"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
                </svg>
                WHATSAPP
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TEDxFAQSection;