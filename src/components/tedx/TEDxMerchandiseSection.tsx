import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";

const TEDxMerchandiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [favorites, setFavorites] = useState<string[]>([]);

  const merchandise = [
    {
      id: "tedx-tshirt",
      name: "TEDx ITENAS T-Shirt",
      price: "150.000",
      originalPrice: "200.000",
      image: "/placeholder-tshirt.jpg",
      category: "Apparel",
      description: "Premium cotton t-shirt dengan design eksklusif TEDxITENAS",
      colors: ["Black", "White", "Red"],
      sizes: ["S", "M", "L", "XL"],
      rating: 4.8,
      reviews: 24,
      badge: "Best Seller"
    },
    {
      id: "tedx-hoodie",
      name: "TEDx ITENAS Hoodie",
      price: "350.000",
      originalPrice: "450.000",
      image: "/placeholder-hoodie.jpg",
      category: "Apparel",
      description: "Hoodie berkualitas tinggi dengan logo TEDx yang stylish",
      colors: ["Black", "Gray", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      rating: 4.9,
      reviews: 18,
      badge: "Limited"
    },
    {
      id: "tedx-notebook",
      name: "TEDx Ideas Notebook",
      price: "75.000",
      originalPrice: null,
      image: "/placeholder-notebook.jpg",
      category: "Stationery",
      description: "Notebook premium untuk mencatat ide-ide inspiratif Anda",
      colors: ["Black", "Red"],
      sizes: ["A5"],
      rating: 4.7,
      reviews: 32,
      badge: null
    },
    {
      id: "tedx-tumbler",
      name: "TEDx Stainless Tumbler",
      price: "125.000",
      originalPrice: null,
      image: "/placeholder-tumbler.jpg",
      category: "Lifestyle",
      description: "Tumbler stainless steel dengan design TEDx yang elegan",
      colors: ["Black", "Silver"],
      sizes: ["500ml"],
      rating: 4.6,
      reviews: 15,
      badge: "Eco-Friendly"
    },
    {
      id: "tedx-totebag",
      name: "TEDx Canvas Tote Bag",
      price: "100.000",
      originalPrice: "130.000",
      image: "/placeholder-totebag.jpg",
      category: "Accessories",
      description: "Tote bag canvas berkualitas dengan print TEDx yang awet",
      colors: ["Natural", "Black"],
      sizes: ["Standard"],
      rating: 4.5,
      reviews: 28,
      badge: "Sustainable"
    },
    {
      id: "tedx-pin",
      name: "TEDx Enamel Pin Set",
      price: "50.000",
      originalPrice: null,
      image: "/placeholder-pin.jpg",
      category: "Accessories",
      description: "Set pin enamel eksklusif dengan various design TEDx",
      colors: ["Multicolor"],
      sizes: ["Standard"],
      rating: 4.8,
      reviews: 41,
      badge: "Collector's Item"
    }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="merchandise" className="py-20 bg-gradient-to-b from-tedx-black to-muted/20">
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
            OFFICIAL MERCHANDISE
          </h2>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-6"></div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto tedx-subheadline">
            Koleksi eksklusif merchandise TEDxITENAS untuk menunjukkan dukungan Anda pada gerakan penyebaran ide
          </p>
        </motion.div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchandise.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover-scale cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-tedx-red/20 h-full overflow-hidden group">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-tedx-red/10 to-event-purple/10 aspect-square">
                  {/* Placeholder Image */}
                  <div className="w-full h-full bg-gradient-to-br from-tedx-red/20 to-event-cyan/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white/20 mb-2">TED<span className="text-tedx-red/40">x</span></div>
                      <div className="text-white/40 text-sm uppercase tracking-wider">{item.category}</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.badge && (
                      <Badge className={`${
                        item.badge === "Best Seller" ? "bg-event-yellow text-tedx-black" :
                        item.badge === "Limited" ? "bg-tedx-red text-white" :
                        item.badge === "Eco-Friendly" ? "bg-event-cyan text-tedx-black" :
                        item.badge === "Sustainable" ? "bg-event-dark-blue text-white" :
                        "bg-event-purple text-white"
                      } font-bold text-xs px-2 py-1`}>
                        {item.badge}
                      </Badge>
                    )}
                    {item.originalPrice && (
                      <Badge className="bg-event-yellow text-tedx-black font-bold text-xs px-2 py-1">
                        SALE
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
                  >
                    <Heart className={`w-5 h-5 ${
                      favorites.includes(item.id) 
                        ? "text-tedx-red fill-tedx-red" 
                        : "text-white"
                    } transition-colors`} />
                  </button>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Button className="tedx-cta-button">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? "text-event-yellow fill-event-yellow"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">({item.reviews})</span>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg event-title">
                      {item.name}
                    </h3>
                    <p className="text-white/70 text-sm event-text">
                      {item.description}
                    </p>
                  </div>

                  {/* Colors */}
                  <div className="space-y-2">
                    <div className="text-white/60 text-xs uppercase tracking-wider">Colors:</div>
                    <div className="flex gap-2">
                      {item.colors.map((color, colorIndex) => (
                        <span
                          key={colorIndex}
                          className="text-white/80 text-xs bg-white/10 px-2 py-1 rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">
                      Rp {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-white/50 line-through text-lg">
                        Rp {item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full tedx-cta-button">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    ADD TO CART
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Shipping Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-tedx-red/10 to-event-purple/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 event-title">
              SHIPPING & INFORMATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-white/80 event-text">
              <div className="text-center">
                <div className="w-12 h-12 bg-event-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-6 h-6 text-event-yellow" />
                </div>
                <div className="font-semibold text-white mb-2">Free Shipping</div>
                <p>Minimal pembelian Rp 300.000</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-event-cyan/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-event-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-semibold text-white mb-2">Fast Delivery</div>
                <p>2-3 hari kerja untuk Jakarta & sekitarnya</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-event-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-event-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-semibold text-white mb-2">Quality Guarantee</div>
                <p>100% original merchandise dengan kualitas premium</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tedx-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-tedx-red" />
                </div>
                <div className="font-semibold text-white mb-2">Support TEDx</div>
                <p>Setiap pembelian mendukung misi TEDx</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TEDxMerchandiseSection;