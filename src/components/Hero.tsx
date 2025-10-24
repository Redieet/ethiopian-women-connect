import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Users, Truck } from "lucide-react";
import heroImage from "@/assets/hero-entrepreneur.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Empowering Women Entrepreneurs</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                ምን አለሽ?
              </span>
              <br />
              <span className="text-foreground">
                Your Trusted Digital Marketplace
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A secure e-commerce and collaboration hub built for Ethiopian women entrepreneurs. 
              Connect with verified sellers, collaborate with peers, and grow your business with trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?tab=signup&role=seller">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Join as Seller
                </Button>
              </Link>
              <Link to="/auth?tab=signup&role=buyer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Features badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <span>Women-Led Logistics</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in lg:animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img
              src={heroImage}
              alt="Ethiopian woman entrepreneur"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
