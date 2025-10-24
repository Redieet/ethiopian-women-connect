import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Users, TrendingUp, Plus, MessageCircle, ArrowLeft, Home } from "lucide-react";

const SellerDashboard = () => {
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

          {/* Welcome Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-foreground">Welcome back, </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Seller!
              </span>
            </h1>
            <p className="text-muted-foreground">Manage your products and grow your business</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Package className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground">Active Products</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <ShoppingBag className="w-8 h-8 text-accent mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">12</div>
              <div className="text-sm text-muted-foreground">Pending Orders</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Users className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">156</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <TrendingUp className="w-8 h-8 text-accent mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">45,000 ETB</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border-2 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button variant="hero" className="h-auto py-4 flex flex-col gap-2">
                    <Plus className="w-6 h-6" />
                    <span>Add New Product</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Package className="w-6 h-6" />
                    <span>Manage Inventory</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <ShoppingBag className="w-6 h-6" />
                    <span>View Orders</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <MessageCircle className="w-6 h-6" />
                    <span>Messages</span>
                  </Button>
                </div>
              </Card>

              {/* Recent Orders */}
              <Card className="p-6 border-2 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {[
                    { id: "#1234", customer: "Marta K.", product: "Handmade Scarf", status: "Pending", amount: "850 ETB" },
                    { id: "#1233", customer: "Sara M.", product: "Coffee Beans", status: "In Transit", amount: "1,200 ETB" },
                    { id: "#1232", customer: "Rahel T.", product: "Traditional Dress", status: "Delivered", amount: "3,500 ETB" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <div className="font-semibold text-foreground">{order.id} - {order.product}</div>
                        <div className="text-sm text-muted-foreground">{order.customer}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{order.amount}</div>
                        <div className="text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered" ? "bg-accent/20 text-accent" :
                            order.status === "In Transit" ? "bg-primary/20 text-primary" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-bold text-foreground mb-4">Connect Your Followers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Link your Telegram or TikTok and earn rewards when you bring your followers to the platform!
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📱 Telegram Channel:</span>
                    <span className="text-sm font-medium">@yourbusiness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎵 TikTok Shop:</span>
                    <span className="text-sm font-medium">tiktok.com/@yourbusiness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">👥 Followers Migrated:</span>
                    <span className="text-sm font-medium text-primary">247</span>
                  </div>
                </div>
                <Button variant="hero" className="w-full">
                  Connect Social Media
                </Button>
              </Card>

              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Seller Collaboration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other verified sellers for collaboration opportunities
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Active Collaborations:</span>
                    <span className="font-medium text-primary">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Shared Deliveries:</span>
                    <span className="font-medium text-accent">12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Collaboration Savings:</span>
                    <span className="font-medium text-green-600">2,400 ETB</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Browse Sellers
                  </Button>
                  <Button variant="outline" className="w-full">
                    Join Collaboration Groups
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Your Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Products Sold</span>
                    <span className="font-semibold text-foreground">142</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Rating</span>
                    <span className="font-semibold text-foreground">4.8 ⭐</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-semibold text-foreground">2.5 hrs</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
