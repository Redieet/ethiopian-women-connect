import { ShieldCheck, Users, TrendingUp, MessageCircle, Sparkles, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Middleman System",
    description: "Your payments are safely held until delivery is confirmed, protecting both buyers and sellers.",
    color: "from-primary to-primary/80",
  },
  {
    icon: Users,
    title: "Verified Sellers",
    description: "All sellers undergo KYC verification to ensure trust and authenticity in every transaction.",
    color: "from-accent to-accent/80",
  },
  {
    icon: MessageCircle,
    title: "Seller Collaboration",
    description: "Connect with fellow entrepreneurs, share stock, and grow together through our community.",
    color: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    title: "Follower Migration",
    description: "Bring your Telegram and TikTok followers to the platform and earn rewards for referrals.",
    color: "from-accent to-primary",
  },
  {
    icon: Sparkles,
    title: "Women-Led Logistics",
    description: "Partner with female-driven bus companies for reliable and empowering delivery services.",
    color: "from-primary/80 to-accent/80",
  },
  {
    icon: Heart,
    title: "Community Support",
    description: "Join discussion boards, find mentorship, and access resources to grow your business.",
    color: "from-accent/80 to-primary/80",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose
            </span>{" "}
            <span className="text-foreground">ምን አለሽ?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built by women, for women. Everything you need to succeed in e-commerce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-2 border-border hover:border-primary/50 group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:shadow-[var(--shadow-glow)] transition-all duration-300`}>
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
