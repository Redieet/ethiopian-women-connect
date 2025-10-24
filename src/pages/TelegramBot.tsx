import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, Smartphone, Wifi, Users, ShoppingBag, Truck, ArrowLeft, Home } from "lucide-react";

const TelegramBot = () => {
  const botFeatures = [
    {
      icon: "🛍️",
      title: "Browse Products",
      description: "View categories and product details with simple commands",
      example: "/products or /category fashion"
    },
    {
      icon: "💬",
      title: "Make Inquiries",
      description: "Ask questions about product availability and details",
      example: "Is this dress available in size M?"
    },
    {
      icon: "📦",
      title: "Order Placement",
      description: "Place orders with simple text commands",
      example: "I want to order the coffee set"
    },
    {
      icon: "💰",
      title: "Payment Options",
      description: "Cash on delivery, TeleBirr, CBE Birr integration",
      example: "Pay with TeleBirr or cash on delivery"
    },
    {
      icon: "🚚",
      title: "Order Tracking",
      description: "Track your orders with delivery codes",
      example: "Track order #12345"
    }
  ];

  const sampleConversation = [
    { user: "Hi! I want to buy some coffee", bot: "Welcome! Here are our coffee products: ☕" },
    { user: "Show me the traditional coffee set", bot: "Traditional Coffee Set - 1,200 ETB\nFrom Sara's Coffee House\nRating: 4.9⭐\n\nWould you like to order?" },
    { user: "Yes, I'll take it", bot: "Great! Please provide:\n• Your name\n• Delivery address\n• Phone number\n\nPayment: Cash on delivery or TeleBirr?" },
    { user: "Cash on delivery. My name is Alem, address: Bole, phone: +251911234567", bot: "Order confirmed! 🎉\nOrder ID: #ORD-001\nDelivery Code: 8492\n\nYour order will be delivered by Selam Bus with driver Hanna Abebe. You'll receive updates!" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6 flex gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Accessible Everywhere</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Telegram Bot
              </span>{" "}
              <span className="text-foreground">Demo</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access our platform even with low data, older phones, or in remote areas. 
              Our Telegram bot brings the full marketplace experience to your messages.
            </p>
          </div>

          {/* Why Telegram Bot Matters */}
          <Card className="mb-16 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Why Telegram Bot{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Matters
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Telegram works even in low-internet situations. Not everyone has a smartphone or web browser, 
                so our bot provides easy access for people with older phones, messaging preferences, or quick task needs.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Older Phones</h3>
                  <p className="text-sm text-muted-foreground">Works on any phone with Telegram app</p>
                </div>
                <div className="text-center">
                  <Wifi className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Low Data</h3>
                  <p className="text-sm text-muted-foreground">Efficient messaging uses minimal data</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">Inclusive for all users and regions</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Bot Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Bot Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {botFeatures.map((feature, index) => (
                <Card key={index} className="p-6 border-2 border-border hover:border-primary/50 transition-all group">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <p className="text-sm font-mono text-foreground">{feature.example}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Conversation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Sample Conversation</h2>
            <Card className="p-8 border-2 border-border">
              <div className="space-y-4">
                {sampleConversation.map((message, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      message.user ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    }`}>
                      {message.user ? 'U' : 'B'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {message.user ? 'User' : 'ምን አለሽ? Bot'}
                      </div>
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        {message.user || message.bot}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Offline Mode */}
          <Card className="mb-16 p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Offline Mode{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Capabilities
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                When users have poor signal, our bot queues messages and processes them automatically 
                when connection returns. No need to retry manually - perfect for East African connectivity challenges.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Message Queuing</h3>
                  <p className="text-sm text-muted-foreground">Messages are queued when offline and sent when connection returns</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Auto Processing</h3>
                  <p className="text-sm text-muted-foreground">Orders and requests are processed automatically when online</p>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA Section */}
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Try Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Telegram Bot
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the full marketplace through Telegram. Accessible, efficient, and perfect for all users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Start Chatting with Bot
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TelegramBot;
