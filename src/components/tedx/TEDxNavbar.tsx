import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TEDxNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    { label: "Home", action: () => scrollToSection("hero") },
    { label: "About", action: () => scrollToSection("about") },
    { 
      label: "Event", 
      dropdown: [
        { label: "Pre-Event", action: () => scrollToSection("pre-event") },
        { label: "Main Event", action: () => scrollToSection("main-event") }
      ]
    },
    { label: "Tickets", action: () => scrollToSection("tickets") },
    { label: "Merchandise", action: () => scrollToSection("merchandise") },
    { label: "Sponsorship", action: () => scrollToSection("sponsorship") },
    { label: "Partnership", action: () => scrollToSection("partnership") },
    { label: "FAQ", action: () => scrollToSection("faq") },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* TEDx Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white">
              TED<span className="text-tedx-red">x</span>ITENAS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.dropdown ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-tedx-red transition-colors duration-300 font-medium uppercase tracking-wider text-sm">
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/95 border-border">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <DropdownMenuItem
                        key={dropdownIndex}
                        onClick={dropdownItem.action}
                        className="text-white hover:text-tedx-red hover:bg-muted cursor-pointer"
                      >
                        {dropdownItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={index}
                  onClick={item.action}
                  className="text-white hover:text-tedx-red transition-colors duration-300 font-medium uppercase tracking-wider text-sm"
                >
                  {item.label}
                </button>
              )
            ))}

            {/* Get Tickets CTA */}
            <Button 
              onClick={() => scrollToSection("tickets")}
              className="tedx-cta-button px-6 py-2 rounded-full"
            >
              GET TICKETS
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-tedx-red">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black">
                <nav className="flex flex-col gap-6 mt-8">
                  {navItems.map((item, index) => (
                    item.dropdown ? (
                      <div key={index} className="flex flex-col gap-2">
                        <span className="text-white font-medium uppercase tracking-wider text-sm">
                          {item.label}
                        </span>
                        <div className="pl-4 flex flex-col gap-2">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <button
                              key={dropdownIndex}
                              onClick={dropdownItem.action}
                              className="text-left text-muted-foreground hover:text-tedx-red transition-colors"
                            >
                              {dropdownItem.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        key={index}
                        onClick={item.action}
                        className="text-left text-white hover:text-tedx-red transition-colors font-medium uppercase tracking-wider text-sm"
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                  <Button 
                    onClick={() => scrollToSection("tickets")}
                    className="tedx-cta-button mt-4"
                  >
                    GET TICKETS
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TEDxNavbar;