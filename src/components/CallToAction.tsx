import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Our Growing Community</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-foreground">Join ምን አለሽ? today and grow your business with trust!</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Shop local. Support women. Stay connected. Link your Telegram and bring your customers with you!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/auth?tab=signup&role=seller">
              <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                Join as Seller
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth?tab=signup&role=buyer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Community
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">1000+</div>
              <div className="text-sm text-muted-foreground">Women Entrepreneurs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">5000+</div>
              <div className="text-sm text-muted-foreground">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
