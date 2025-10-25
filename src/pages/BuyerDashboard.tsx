import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, Package, Star, ArrowLeft, Home, MapPin, Users, CheckCircle, MessageCircle, Eye } from "lucide-react";
import { sampleSellers } from "@/data/sampleData";

const BuyerDashboard = () => {
  const products = [
    { 
      id: "prod-1",
      name: "Traditional Coffee Set", 
      seller: "Sara's Coffee House", 
      sellerLocation: "Addis Ababa",
      price: "1,200 ETB", 
      deliveryFee: "150 ETB",
      totalPrice: "1,350 ETB",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop", 
      rating: 4.9,
      telegramChannel: "@sarascoffee",
      tiktokShop: "tiktok.com/@sarascoffee",
      description: "Premium Ethiopian coffee beans from Sidamo region",
      category: "Food & Beverages",
      verified: true
    },
    { 
      id: "prod-3",
      name: "Handwoven Basket", 
      seller: "Marta's Crafts", 
      sellerLocation: "Bahir Dar",
      price: "450 ETB", 
      deliveryFee: "200 ETB",
      totalPrice: "650 ETB",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop", 
      rating: 4.8,
      telegramChannel: "@martascrafts",
      tiktokShop: "tiktok.com/@martascrafts",
      description: "Traditional handwoven basket made from natural materials",
      category: "Handmade Crafts",
      verified: true
    },
    { 
      id: "prod-5",
      name: "Ethiopian Traditional Dress", 
      seller: "Rahel Fashion", 
      sellerLocation: "Hawassa",
      price: "3,200 ETB", 
      deliveryFee: "250 ETB",
      totalPrice: "3,450 ETB",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop", 
      rating: 5.0,
      telegramChannel: "@rahelfashion",
      tiktokShop: "tiktok.com/@rahelfashion",
      description: "Beautiful traditional Ethiopian dress with intricate embroidery",
      category: "Fashion & Clothing",
      verified: true
    },
    { 
      id: "prod-7",
      name: "Organic Honey", 
      seller: "Natural Products Co.", 
      sellerLocation: "Jimma",
      price: "850 ETB", 
      deliveryFee: "180 ETB",
      totalPrice: "1,030 ETB",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop", 
      rating: 4.7,
      telegramChannel: "@naturalproducts",
      tiktokShop: "tiktok.com/@naturalproducts",
      description: "Pure organic honey from local beekeepers",
      category: "Food & Beverages",
      verified: true
    },
    { 
      id: "prod-8",
      name: "Handmade Jewelry Set", 
      seller: "Jewels by Hanna", 
      sellerLocation: "Addis Ababa",
      price: "680 ETB", 
      deliveryFee: "120 ETB",
      totalPrice: "800 ETB",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop", 
      rating: 4.9,
      telegramChannel: "@jewelsbyhanna",
      tiktokShop: "tiktok.com/@jewelsbyhanna",
      description: "Elegant handmade jewelry set with traditional Ethiopian designs",
      category: "Jewelry & Accessories",
      verified: true
    },
    { 
      id: "prod-2",
      name: "Spice Collection", 
      seller: "Alem's Spices", 
      sellerLocation: "Dire Dawa",
      price: "520 ETB", 
      deliveryFee: "220 ETB",
      totalPrice: "740 ETB",
      image: "https://images.unsplash.com/photo-1596040033229-a0b55ee0c922?w=300&h=300&fit=crop", 
      rating: 4.6,
      telegramChannel: "@alemspices",
      tiktokShop: "tiktok.com/@alemspices",
      description: "Authentic Ethiopian spice collection for traditional cooking",
      category: "Food & Beverages",
      verified: true
    },
  ];

  const orders = [
    { id: "#ORD-001", product: "Traditional Coffee Set", seller: "Sara's Coffee House", amount: "1,350 ETB", status: "In Transit", deliveryCode: "8492" },
    { id: "#ORD-002", product: "Handwoven Basket", seller: "Marta's Crafts", amount: "650 ETB", status: "Delivered", deliveryCode: "7391" },
    { id: "#ORD-003", product: "Ethiopian Dress", seller: "Rahel Fashion", amount: "3,450 ETB", status: "Pending", deliveryCode: "9583" },
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
          <Link to="/buyer-dashboard/tiktok" className="px-3 ml-[900px] py-2 rounded-lg hover:bg-amber-50">
  <button className="p-2 bg-gradient-to-r from-red-500 to-orange-400 rounded-2xl">TikTok Collection</button> 
</Link>
          </div>

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

          {/* Escrow Payment Info */}
          <Card className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Secure Escrow Payment System</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your payment is held securely by our platform until you confirm delivery. 
              Sellers only receive payment after you confirm you've received your item in good condition.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Payment Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Delivery Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Payment Released</span>
              </div>
            </div>
          </Card>

          {/* My Orders */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">My Orders</h2>
            <div className="space-y-4">
              {orders.map((order, index) => (
                <Card key={index} className="p-4 border-2 border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{order.id} - {order.product}</div>
                      <div className="text-sm text-muted-foreground">{order.seller}</div>
                      <div className="text-sm text-muted-foreground">Delivery Code: {order.deliveryCode}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{order.amount}</div>
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" ? "bg-green-100 text-green-800" :
                          order.status === "In Transit" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Sellers */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Featured Sellers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleSellers.slice(0, 6).map((seller) => (
                <Card key={seller.id} className="p-6 border-2 border-border hover:border-primary/50 transition-all group">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={seller.profileImage}
                      alt={seller.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {seller.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{seller.businessName}</p>
                        </div>
                        {seller.verified && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{seller.location}</span>
                        <Badge variant="secondary" className="text-xs">
                          {seller.productType}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{seller.rating}</span>
                        <span className="text-xs text-muted-foreground">({seller.totalSales} sales)</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {seller.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Link to={`/seller-profile/${seller.id}`}>
                      <Button variant="hero" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
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
                    {product.verified && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                        ✓ Verified
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">• {product.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">by {product.seller}</p>
                    <p className="text-xs text-muted-foreground mb-3">{product.sellerLocation}</p>
                    
                    {/* Social Integration */}
                    <div className="flex gap-2 mb-3">
                      <Button variant="outline" size="sm" className="text-xs">
                        📱 {product.telegramChannel}
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        🎵 TikTok Shop
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Product Price:</span>
                        <span className="font-medium">{product.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee:</span>
                        <span className="font-medium">{product.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-primary border-t pt-2">
                        <span>Total (Secured):</span>
                        <span>{product.totalPrice}</span>
                      </div>
                    </div>
                    
                    <Link to={`/payment/${product.id}`}>
                      <Button variant="hero" size="sm" className="w-full">
                        Buy Securely
                      </Button>
                    </Link>
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
