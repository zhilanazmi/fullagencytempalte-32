const PortfolioSection = () => {
  const portfolioItems = [
    {
      title: "Analytic",
      description: "This site section features bold, animated hero section, crafted for innovative startups and SaaS products."
    },
    {
      title: "Glow", 
      description: "Multi-section layout for startups with multiple offerings. Features modular blocks, testimonials, and pricing tables."
    },
    {
      title: "Nebula Glow",
      description: "A sleek, cosmic-inspired portfolio template for developers and creatives who want to turn their ideas into stunning, interactive digital experiences."
    },
    {
      title: "Netlify",
      description: "Dynamic digital marketing platform. From website Design & Dev to SEO and content development."
    }
  ];

  return (
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-20">
        {/* Header */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-4">
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm font-mono font-normal uppercase tracking-widest">
              Portfolio
            </span>
          </div>
          <div className="w-full flex flex-col items-center gap-6">
            <h2 className="text-foreground text-center text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              Works that build trust
            </h2>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="w-full flex flex-col gap-12 md:gap-16">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {portfolioItems.slice(0, 2).map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-6"
              >
                {/* Image */}
                <img 
                  src={index === 0 ? "/lovable-uploads/ca726aeb-14b0-4feb-b0c4-92c1b987aa5c.png" : "/lovable-uploads/17aad732-b6f8-493f-8507-7b052773c7ba.png"}
                  alt={item.title}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                />
                
                {/* Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-lg font-normal leading-7">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-base font-normal leading-6">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {portfolioItems.slice(2, 4).map((item, index) => (
              <div 
                key={index + 2} 
                className="flex flex-col gap-6"
              >
                {/* Image */}
                <img 
                  src={index === 0 ? "/lovable-uploads/061fa504-8acc-40d1-8ead-bb3c3e8b5384.png" : "/lovable-uploads/2f941d0c-38ce-4086-9183-9b084f5502be.png"}
                  alt={item.title}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                />
                
                {/* Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-lg font-normal leading-7">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-base font-normal leading-6">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;