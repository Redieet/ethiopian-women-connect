import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, TrendingUp, Heart } from "lucide-react";

const Community = () => {
  const categories = [
    { name: "Fashion & Clothing", members: 450, icon: "👗" },
    { name: "Handmade Crafts", members: 320, icon: "🎨" },
    { name: "Food Products", members: 280, icon: "🍲" },
    { name: "Beauty & Cosmetics", members: 390, icon: "💄" },
    { name: "Home & Decor", members: 210, icon: "🏠" },
    { name: "Technology & Gadgets", members: 150, icon: "📱" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Stronger Together</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Community
              </span>{" "}
              <span className="text-foreground">Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow women entrepreneurs, share knowledge, and grow together
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">1000+</div>
              <div className="text-muted-foreground">Active Members</div>
            </Card>
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-muted-foreground">Daily Conversations</div>
            </Card>
            <Card className="p-6 text-center border-2 border-border hover:border-primary/50 transition-all">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </Card>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Join by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-2 border-border hover:border-primary/50 group"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.members} members</p>
                  <Button variant="outline" className="w-full">
                    Join Telegram Group
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Mentorship */}
          <Card className="mt-16 p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Find a{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Mentor
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with experienced entrepreneurs who can guide you on your journey
              </p>
              <Button variant="hero" size="lg">
                Browse Mentors
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
