import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, MapPin, Clock, Users, TrendingUp, Heart } from "lucide-react";

const Logistics = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Women-Led Logistics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Logistics
              </span>{" "}
              <span className="text-foreground">Partners</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering women in logistics and delivery services across Ethiopia
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">150+</div>
              <div className="text-muted-foreground">Female Drivers</div>
            </Card>
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">25+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </Card>
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">2.5hrs</div>
              <div className="text-muted-foreground">Avg. Delivery Time</div>
            </Card>
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">98%</div>
              <div className="text-muted-foreground">On-Time Rate</div>
            </Card>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all group">
              <Truck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                Women-Led Fleet
              </h3>
              <p className="text-muted-foreground mb-4">
                Our fleet is primarily managed and driven by women, creating safe and empowering work environments.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all group">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                Nationwide Coverage
              </h3>
              <p className="text-muted-foreground mb-4">
                We deliver to major cities across Ethiopia with reliable and efficient logistics solutions.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all group">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                Fast & Reliable
              </h3>
              <p className="text-muted-foreground mb-4">
                Quick delivery times with real-time tracking and excellent customer service.
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Logistics Network
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Become a logistics partner and help us empower women while building a sustainable delivery network across Ethiopia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/logistics-dashboard">
                <Button variant="hero" size="lg">
                  View Partner Dashboard
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Logistics;
