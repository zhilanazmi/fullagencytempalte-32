import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export function SubmitTemplateDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectLink: "",
    email: "",
    agreedToTerms: false,
  });
  const { toast } = useToast();

  const linkStyles = "text-white/50 text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5 hover:text-white/70 transition-colors cursor-pointer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectLink || !formData.email || !formData.agreedToTerms) {
      toast({
        title: "Error",
        description: "Please fill in all fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://hook.eu2.make.com/s4wq189syilrhcuwu32l343r81dq3mf3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          projectLink: formData.projectLink,
          email: formData.email,
          timestamp: new Date().toISOString(),
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting template:", error);
      toast({
        title: "Error",
        description: "Failed to submit template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setFormData({
      projectLink: "",
      email: "",
      agreedToTerms: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={linkStyles}>
          Submit&earn
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Submit Your Lovable Template. Get $100.
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Share your original SaaS/Tech/AI landing page (preferably dark mode) built in Lovable. If we accept your design, you'll get $100.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectLink">Lovable Project Link (public share URL)</Label>
                <Input
                  id="projectLink"
                  type="url"
                  placeholder="https://lovable.dev/projects/..."
                  value={formData.projectLink}
                  onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, agreedToTerms: checked as boolean })
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I confirm this is my original work and grant Webfluin full rights if accepted.
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Template"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Thank you for your submission!
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                We'll review your template within 24 hours. If accepted, we'll email you regarding the payment to the email you provided.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}