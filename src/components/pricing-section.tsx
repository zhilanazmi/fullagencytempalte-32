
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);
  const { user, session, subscription, checkSubscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const standardFeatures = [
    "Access free templates",
    "Remix links with prompts", 
    "Community updates"
  ];

  const premiumFeatures = [
    "Unlimited templates & sections",
    "Priority support",
    "New weekly drops",
    "Early access exclusives",
    "Commercial license included"
  ];

  const premiumPrice = billingPeriod === 'yearly' ? '$4.99/mo' : '$9.99/mo';

  const formatRenewalDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { billingPeriod },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Redirect to Stripe checkout (more reliable on mobile than window.open)
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = () => {
    if (!user?.email) {
      toast({
        title: "Authentication required",
        description: "Please sign in first",
        variant: "destructive",
      });
      return;
    }

    // Direct link to Stripe billing portal with prefilled email
    const billingUrl = `https://billing.stripe.com/p/login/00wbJ33rSgqY0iYfSWffy00?prefilled_email=${encodeURIComponent(user.email)}`;
    window.open(billingUrl, '_blank');
  };

  const handleRefreshSubscription = async () => {
    await checkSubscription();
    toast({
      title: "Subscription refreshed",
      description: "Your subscription status has been updated",
    });
  };

  return (
    <section className="w-full bg-black px-4 md:px-16 py-14 md:py-28 overflow-hidden">
      <div className="flex flex-col items-center gap-6 md:gap-12">
        {/* Header */}
        <div className="max-w-3xl flex flex-col items-center gap-4 md:gap-6">
          <div className="text-[#7D8187] text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5">
            [ PRICING ]
          </div>
          <div className="text-center text-white text-3xl md:text-5xl font-normal leading-tight md:leading-[48px]">
            Simple Plan for All
          </div>
        </div>

        {/* Subscription Status - Only show for premium users */}
        {user && subscription.subscribed && (
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#7D8187] text-sm">
              Current Plan: {subscription.subscription_tier || 'Premium'}
            </div>
            <Button
              onClick={handleRefreshSubscription}
              variant="outline"
              size="sm"
              className="text-xs border-[#404040] text-[#7D8187] hover:text-white hover:bg-[#404040]"
            >
              Refresh Status
            </Button>
          </div>
        )}

        {/* Billing Toggle */}
        <div className="rounded-full border border-[#1F2228] overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5 transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-[#1F2228] text-white'
                  : 'text-[#7D8187] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5 transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-[#1F2228] text-white'
                  : 'text-[#7D8187] hover:text-white'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          {/* Standard Plan */}
          <div className="flex-1 p-8 border border-[#1F2228] flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white text-xl font-normal leading-7">Standard</h3>
              </div>
            </div>
            
            <div className="h-px bg-[#1F2228]"></div>
            
            <div className="text-white text-3xl md:text-5xl font-normal leading-tight md:leading-[48px]">
              $0.00/mo
            </div>
            
            <Button
              variant="outline"
              className="w-full py-3 rounded-full border-[#404040] text-white text-sm font-mono font-medium uppercase tracking-[1.4px] leading-5 hover:bg-[#404040] transition-colors duration-200"
              disabled
            >
              Current Plan
            </Button>
            
            <div className="h-px bg-[#1F2228]"></div>
            
            <div className="flex flex-col gap-4 py-2">
              {standardFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#7D8187] mt-0.5 flex-shrink-0" />
                  <span className="text-[#7D8187] text-base font-normal leading-6">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Plan */}
          <div className={`flex-1 p-8 border flex flex-col gap-8 ${
            subscription.subscribed
              ? 'border-white bg-[#0A0A0A]'
              : 'border-[#1F2228]'
          }`}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="gradient-text text-xl font-normal leading-7">Premium</h3>
                {subscription.subscribed && (
                  <span className="text-xs bg-white text-black px-2 py-1 rounded font-mono uppercase">
                    Current
                  </span>
                )}
              </div>
            </div>
            
            <div className="h-px bg-[#1F2228]"></div>
            
            <div className="text-white text-3xl md:text-5xl font-normal leading-tight md:leading-[48px]">
              {premiumPrice}
            </div>
            
            {subscription.subscribed ? (
              <Button
                onClick={handleManageSubscription}
                className="w-full py-3 rounded-full bg-white text-black text-sm font-mono font-medium uppercase tracking-[1.4px] leading-5 hover:bg-gray-200 transition-colors duration-200"
              >
                Manage Subscription
              </Button>
            ) : (
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3 rounded-full bg-white text-black text-sm font-mono font-medium uppercase tracking-[1.4px] leading-5 hover:bg-gray-200 transition-colors duration-200"
              >
                {loading ? "Loading..." : "Get started"}
              </Button>
            )}
            
            <div className="h-px bg-[#1F2228]"></div>
            
            <div className="flex flex-col gap-4 py-2">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white text-base font-normal leading-6">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
