import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">About </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ምን አለሽ?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're building Ethiopia's most trusted digital marketplace, created by women, for women. 
              Our mission is to empower young Ethiopian women entrepreneurs by connecting sellers, buyers, 
              and logistics providers in one secure platform.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 border-2 border-border hover:border-primary/50 transition-all">
              <Target className="w-12 h-12 text-primary mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a safe, trusted, and empowering digital ecosystem where Ethiopian women 
                entrepreneurs can grow their businesses, collaborate with peers, and achieve financial 
                independence through e-commerce.
              </p>
            </Card>

            <Card className="p-8 border-2 border-border hover:border-primary/50 transition-all">
              <Award className="w-12 h-12 text-accent mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading platform that connects Ethiopian women entrepreneurs, fostering a 
                community of trust, collaboration, and sustainable business growth across the country.
              </p>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Trust</h3>
                <p className="text-muted-foreground">
                  Every seller is verified, every transaction is secure
                </p>
              </Card>

              <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Community</h3>
                <p className="text-muted-foreground">
                  Women helping women, growing together
                </p>
              </Card>

              <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Empowerment</h3>
                <p className="text-muted-foreground">
                  Tools and support to help you succeed
                </p>
              </Card>
            </div>
          </div>

          {/* Contact Section */}
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-foreground">Get in </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have questions? Want to partner with us? We'd love to hear from you!
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="text-left">
                <p className="font-medium text-foreground mb-1">Email</p>
                <p className="text-muted-foreground">info@mnalesh.com</p>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground mb-1">Location</p>
                <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground mb-1">Telegram Bot</p>
                <p className="text-muted-foreground">Coming soon - shop easily from Telegram!</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
