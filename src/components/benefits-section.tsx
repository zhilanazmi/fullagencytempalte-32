const BenefitsSection = () => {
  const benefits = [{
    title: "Increase Conversions",
    description: "We help to improve the sales funnels, improve the copy, use more high-converting layout which leads to a significant CRO increase",
    icon: "/lovable-uploads/133cec0e-caee-4563-92a8-42e6efef1014.png"
  }, {
    title: "Fixed Price, No Hidden Cost",
    description: "Know exactly what you're paying for. We offer clear pricing with no surprise fees, ensuring peace of mind.",
    icon: "/lovable-uploads/c5e7971c-b169-4b6f-937c-e7ed6b7a079c.png"
  }, {
    title: "Top-notch Quality",
    description: "Get a website that looks amazing and works perfectly. We focus on delivering the best, every single time.",
    icon: "/lovable-uploads/fe48a442-e501-4839-85cc-24e2276c98cf.png"
  }, {
    title: "End-to-end creative services",
    description: "We help to improve the sales funnels, improve the copy, use more high-converting layout which leads to a significant CRO increase",
    icon: "/lovable-uploads/cb853165-08ca-4a69-81ff-9e60355c19ef.png"
  }, {
    title: "Stay Ahead of the Market",
    description: "Every page on the web is 1:1 similar to each other. But it's your chance to get something more unique and unusual",
    icon: "/lovable-uploads/a67644dc-e32c-40f6-8668-d89382937b6e.png"
  }, {
    title: "48-Hour Updates",
    description: "We move at lightning speed. We provide drafts, revisions, or final assets, usually within 48 hours.",
    icon: "/lovable-uploads/1aa1297d-00c1-4a87-b5da-19b29ec21bf0.png"
  }];
  return <section className="w-full bg-background pt-[270px] pb-16 md:pb-28 px-4 md:px-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-20">
        {/* Header */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-4 text-center">
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm font-mono font-normal uppercase tracking-widest md:hidden">
              SPEED, SIMPLICITY
            </span>
            <span className="text-muted-foreground text-sm font-mono font-normal uppercase tracking-widest hidden md:inline">
              Speed, simplicity, and stunning design
            </span>
          </div>
          <div className="w-full flex flex-col items-center gap-6">
            <h2 className="text-foreground text-center text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              Benefits of working with us
            </h2>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex-1 pb-8 rounded-2xl border border-[#1F2228] bg-black overflow-hidden">
                <div className="p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-9">
                    {/* Icon */}
                    <img src={benefit.icon} alt={benefit.title} className="w-[100px] h-[100px] object-contain" />
                    <div className="flex flex-col gap-4">
                      <h3 className="text-foreground text-xl font-normal leading-6">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-base font-normal leading-6">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsSection;