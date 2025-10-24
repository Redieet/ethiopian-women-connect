import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, MapPin, Clock, CheckCircle, Package, TrendingUp, ArrowLeft, Home } from "lucide-react";

const LogisticsDashboard = () => {
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
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Logistics Partner
              </span>{" "}
              <span className="text-foreground">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Empowering Women in Logistics 💗</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Package className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">45</div>
              <div className="text-sm text-muted-foreground">Active Deliveries</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <CheckCircle className="w-8 h-8 text-accent mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">342</div>
              <div className="text-sm text-muted-foreground">Completed This Month</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Truck className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">12</div>
              <div className="text-sm text-muted-foreground">Active Drivers</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <TrendingUp className="w-8 h-8 text-accent mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">85,400 ETB</div>
              <div className="text-sm text-muted-foreground">Monthly Earnings</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Assigned Deliveries */}
              <Card className="p-6 border-2 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Today's Deliveries</h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    8 Pending
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { id: "DEL-1245", from: "Merkato", to: "Bole", driver: "Hanna A.", status: "In Transit", time: "Expected: 2:30 PM" },
                    { id: "DEL-1244", from: "Piassa", to: "Megenagna", driver: "Sara T.", status: "Picked Up", time: "Expected: 3:00 PM" },
                    { id: "DEL-1243", from: "4 Kilo", to: "Kazanchis", driver: "Available", status: "Pending", time: "Scheduled: 4:00 PM" },
                  ].map((delivery) => (
                    <div key={delivery.id} className="p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-foreground mb-1">{delivery.id}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {delivery.from} → {delivery.to}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          delivery.status === "In Transit" ? "bg-primary/20 text-primary" :
                          delivery.status === "Picked Up" ? "bg-accent/20 text-accent" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {delivery.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Driver: </span>
                          <span className="font-medium text-foreground">{delivery.driver}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {delivery.time}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="hero" size="sm" className="flex-1">
                          Confirm Delivery
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance */}
              <Card className="p-6 border-2 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Delivery Performance</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">On-Time Delivery Rate</span>
                      <span className="text-sm font-semibold text-foreground">96%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "96%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                      <span className="text-sm font-semibold text-foreground">4.8/5.0</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: "96%" }} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-bold text-foreground mb-4">💪🏽 Women Drivers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Empowering women in logistics - all our drivers are women entrepreneurs
                </p>
                <div className="space-y-3 mb-4">
                  {[
                    { name: "Hanna Abebe", deliveries: 24, rating: 4.9, route: "Addis → Bahir Dar" },
                    { name: "Sara Tadesse", deliveries: 31, rating: 5.0, route: "Addis → Hawassa" },
                    { name: "Marta Girma", deliveries: 18, rating: 4.8, route: "Addis → Jimma" },
                  ].map((driver, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{driver.name}</div>
                        <div className="text-xs text-muted-foreground">{driver.deliveries} deliveries</div>
                        <div className="text-xs text-primary">{driver.route}</div>
                      </div>
                      <div className="text-sm font-semibold text-accent">{driver.rating} ⭐</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">View All Drivers</Button>
              </Card>

              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Assign Delivery
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Truck className="w-4 h-4 mr-2" />
                    Manage Fleet
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Bus Partners</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Selam Bus:</span>
                    <span className="font-medium text-primary">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Abay Bus:</span>
                    <span className="font-medium text-primary">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Sky Bus:</span>
                    <span className="font-medium text-muted-foreground">Pending</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Manage Partners</Button>
              </Card>

              <Card className="p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Pending Payouts</h3>
                <div className="text-3xl font-bold text-primary mb-2">24,500 ETB</div>
                <p className="text-sm text-muted-foreground mb-4">Available to withdraw</p>
                <Button variant="hero" className="w-full">Request Payout</Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LogisticsDashboard;
