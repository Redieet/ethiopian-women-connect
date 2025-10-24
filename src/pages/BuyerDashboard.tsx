import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Heart, Search, Package, Star } from "lucide-react";

const BuyerDashboard = () => {
  const products = [
    { name: "Traditional Coffee Set", seller: "Sara's Shop", price: "1,200 ETB", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop", rating: 4.9 },
    { name: "Handwoven Basket", seller: "Marta Crafts", price: "450 ETB", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop", rating: 4.8 },
    { name: "Ethiopian Dress", seller: "Rahel Fashion", price: "3,200 ETB", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop", rating: 5.0 },
    { name: "Organic Honey", seller: "Natural Products", price: "850 ETB", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop", rating: 4.7 },
    { name: "Handmade Jewelry", seller: "Jewels by Hanna", price: "680 ETB", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop", rating: 4.9 },
    { name: "Spice Collection", seller: "Alem Spices", price: "520 ETB", image: "https://images.unsplash.com/photo-1596040033229-a0b55ee0c922?w=300&h=300&fit=crop", rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-foreground">Welcome, </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Shopper!
              </span>
            </h1>
            <p className="text-muted-foreground">Discover products from verified Ethiopian women entrepreneurs</p>
          </div>

          {/* Search Bar */}
          <Card className="p-6 mb-8 border-2 border-border">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for products, sellers, or categories..." 
                  className="pl-10"
                />
              </div>
              <Button variant="hero">Search</Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <ShoppingBag className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">5</div>
              <div className="text-sm text-muted-foreground">Active Orders</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Heart className="w-8 h-8 text-accent mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">18</div>
              <div className="text-sm text-muted-foreground">Saved Items</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Package className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground">Total Purchases</div>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Shop by Category</h2>
            <div className="flex flex-wrap gap-3">
              {["Fashion", "Handcrafts", "Food", "Beauty", "Home Decor", "Jewelry"].map((category) => (
                <Button key={category} variant="outline">
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden border-2 border-border hover:border-primary/50 hover:shadow-[var(--shadow-soft)] transition-all group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {product.seller}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{product.price}</span>
                      <Button variant="hero" size="sm">Buy Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;
