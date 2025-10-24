import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBag, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-foreground">Admin </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">Platform oversight and management</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Users className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="text-xs text-accent mt-1">+12% this month</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <ShoppingBag className="w-8 h-8 text-accent mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">856</div>
              <div className="text-sm text-muted-foreground">Active Sellers</div>
              <div className="text-xs text-accent mt-1">+8% this month</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">4,523</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
              <div className="text-xs text-accent mt-1">+24% this month</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <AlertCircle className="w-8 h-8 text-destructive mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">8</div>
              <div className="text-sm text-muted-foreground">Pending Disputes</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Verifications */}
              <Card className="p-6 border-2 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Pending Verifications</h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    14 Pending
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Almaz Bekele", type: "Seller", submitted: "2 hours ago" },
                    { name: "Tigist Haile", type: "Seller", submitted: "5 hours ago" },
                    { name: "Selam Transport", type: "Logistics", submitted: "1 day ago" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <div className="font-semibold text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.type} • Submitted {item.submitted}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button variant="hero" size="sm">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 border-2 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent Platform Activity</h2>
                <div className="space-y-3">
                  {[
                    { action: "New seller registered", user: "Marta K.", time: "5 min ago", icon: Users },
                    { action: "Order completed", user: "Order #1245", time: "12 min ago", icon: CheckCircle },
                    { action: "Dispute resolved", user: "Case #89", time: "1 hour ago", icon: AlertCircle },
                    { action: "Payment processed", user: "45,000 ETB", time: "2 hours ago", icon: TrendingUp },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-secondary/50 rounded-lg transition-colors">
                      <activity.icon className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">{activity.user}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Review Products
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    View Disputes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Platform</span>
                    <span className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-accent font-medium">Operational</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payments</span>
                    <span className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-accent font-medium">Operational</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Delivery</span>
                    <span className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-accent font-medium">Operational</span>
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-bold text-foreground mb-2">Platform Revenue</h3>
                <div className="text-3xl font-bold text-primary mb-1">2.4M ETB</div>
                <p className="text-sm text-muted-foreground mb-4">This month</p>
                <Button variant="outline" className="w-full">View Details</Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
