import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ProjectCalculatorSection = () => {
  const { toast } = useToast();
  const [serviceType, setServiceType] = useState<'design' | 'development' | 'both'>('both');
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<'regular' | 'fast' | 'rush'>('regular');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    let basePrice = 0;
    let pricePerPage = 0;

    switch (serviceType) {
      case 'design':
        basePrice = 399;
        pricePerPage = 100;
        break;
      case 'development':
        basePrice = 199;
        pricePerPage = 100;
        break;
      case 'both':
        basePrice = 499;
        pricePerPage = 200;
        break;
    }

    let totalPrice = Math.max(basePrice, basePrice + (pages - 1) * pricePerPage);

    // Add-ons
    if (needContent) totalPrice += pages * 50;
    if (needSEO) totalPrice += pages * 50;

    // Timeline multipliers
    switch (timeline) {
      case 'rush':
        totalPrice += pages * 100;
        break;
      case 'fast':
        totalPrice += pages * 25;
        break;
      case 'regular':
      default:
        // No additional cost
        break;
    }

    return totalPrice;
  };

  const calculateAgencyCost = () => {
    let pricePerPage = 400; // default for design only
    if (serviceType === 'both') {
      pricePerPage = 1000;
    }
    return 8000 + (pages - 1) * pricePerPage;
  };

  const calculateFreelancerCost = () => {
    let pricePerPage = 200; // default for design only
    if (serviceType === 'both') {
      pricePerPage = 500;
    }
    return 3000 + (pages - 1) * pricePerPage;
  };

  const handleSubmitQuote = async () => {
    setIsSubmitting(true);
    
    const formData = {
      serviceType,
      pages,
      needContent,
      needSEO,
      timeline,
      estimatedCost: calculatePrice(),
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch('https://hook.eu2.make.com/jonlu1a1wmy526tvb66a2sd51eqlp1ik', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(formData),
      });

      toast({
        title: "Quote Request Sent",
        description: "Your project details have been sent successfully. We'll get back to you soon!",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator-section" className="w-full bg-background py-16 md:py-28 px-4 md:px-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full max-w-3xl flex flex-col items-center gap-4 text-center pb-12 md:pb-20">
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm font-mono font-normal uppercase tracking-widest">
              Try project estimation calculator
            </span>
          </div>
          <div className="w-full flex flex-col items-center gap-6">
            <h2 className="text-foreground text-center text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              Get premium website within your budget
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
          {/* Left side - Calculator Form */}
          <div className="divide-y divide-[#1E1E1E] p-8 lg:p-12" style={{ backgroundColor: "#0D0D0D" }}>
            <div className="space-y-4 pb-8">
              {/* Service Type */}
              <div className="space-y-4">
              <h3 className="text-foreground text-xl font-normal">
                What kind of service do you need?
              </h3>
               <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer" onClick={() => setServiceType('design')}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    serviceType === 'design' ? 'border-[#FF5656]' : 'border-muted-foreground'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      serviceType === 'design' ? 'bg-[#FF5656]' : 'bg-transparent'
                    }`}></div>
                  </div>
                  <span className="text-foreground">Only Design</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer" onClick={() => setServiceType('development')}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    serviceType === 'development' ? 'border-[#FF5656]' : 'border-muted-foreground'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      serviceType === 'development' ? 'bg-[#FF5656]' : 'bg-transparent'
                    }`}></div>
                  </div>
                  <span className="text-foreground">Only Development</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer" onClick={() => setServiceType('both')}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    serviceType === 'both' ? 'border-[#FF5656]' : 'border-muted-foreground'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      serviceType === 'both' ? 'bg-[#FF5656]' : 'bg-transparent'
                    }`}></div>
                  </div>
                  <span className="text-foreground">Design + Development</span>
                </label>
               </div>
              </div>
            </div>

            {/* Number of Pages */}
            <div className="space-y-4 py-8">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-xl font-normal">
                  Select number of pages:
                </h3>
                <span style={{ color: "#FF5656" }} className="text-xl font-normal">{pages}</span>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[pages]}
                  onValueChange={(value) => setPages(value[0])}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-4 py-8">
              <h3 className="text-foreground text-xl font-normal">Add-ons:</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer" onClick={() => setNeedContent(!needContent)}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      needContent ? 'border-[#FF5656] bg-[#FF5656]' : 'border-muted-foreground'
                    }`}>
                      {needContent && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-foreground">I will need help with content</span>
                  </div>
                  <span style={{ color: "#FF5656" }}>+$50/pages</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer" onClick={() => setNeedSEO(!needSEO)}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      needSEO ? 'border-[#FF5656] bg-[#FF5656]' : 'border-muted-foreground'
                    }`}>
                      {needSEO && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-foreground">I want to optimize my website for SEO</span>
                  </div>
                  <span style={{ color: "#FF5656" }}>+$50/pages</span>
                </label>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 pt-8">
              <h3 className="text-foreground text-xl font-normal">
                How fast do you need this?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer" onClick={() => setTimeline('rush')}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      timeline === 'rush' ? 'border-[#FF5656]' : 'border-muted-foreground'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        timeline === 'rush' ? 'bg-[#FF5656]' : 'bg-transparent'
                      }`}></div>
                    </div>
                    <span className="text-foreground">Within 7 Days</span>
                  </div>
                  <span style={{ color: "#FF5656" }}>+$100/pages</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer" onClick={() => setTimeline('fast')}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      timeline === 'fast' ? 'border-[#FF5656]' : 'border-muted-foreground'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        timeline === 'fast' ? 'bg-[#FF5656]' : 'bg-transparent'
                      }`}></div>
                    </div>
                    <span className="text-foreground">Within 14 Days</span>
                  </div>
                  <span style={{ color: "#FF5656" }}>+$25/pages</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer" onClick={() => setTimeline('regular')}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    timeline === 'regular' ? 'border-[#FF5656]' : 'border-muted-foreground'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      timeline === 'regular' ? 'bg-[#FF5656]' : 'bg-transparent'
                    }`}></div>
                  </div>
                  <span className="text-foreground">Regular Speed (Based on discussion)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right side - Cost Estimation */}
          <div className="space-y-6 p-8 lg:p-12 border border-white/10 rounded-r-2xl"
               style={{ minHeight: "717.98px" }}>
            <div className="space-y-4">
              <h3 className="text-foreground text-2xl font-normal">Estimated Cost</h3>
              <p className="text-muted-foreground">
                This is an instant estimation to give you an idea how much you can save with us.
              </p>
            </div>

            <div className="space-y-4">
              {/* Agency Cost */}
              <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
                <h4 className="text-foreground text-lg font-normal">
                  Typical Agency charges minimum
                </h4>
                <div className="text-foreground text-4xl font-bold">${calculateAgencyCost().toLocaleString()}</div>
                <p className="text-muted-foreground text-sm">
                  + Too much extra time & additional cost
                </p>
              </div>

              {/* Freelancer Cost */}
              <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
                <h4 className="text-foreground text-lg font-normal">
                  Regular Freelancer charges minimum
                </h4>
                <div className="text-foreground text-4xl font-bold">${calculateFreelancerCost().toLocaleString()}</div>
                <p className="text-muted-foreground text-sm">
                  + Too much headache & back-and-forth
                </p>
              </div>

              {/* Webfluin Cost */}
               <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl p-6 space-y-3 text-white">
                <h4 className="text-lg font-normal">With Webfluin Studio</h4>
                <div className="text-5xl font-bold">${calculatePrice().toLocaleString()}</div>
                <p className="text-white/90">Save your money, time & headache</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCalculatorSection;