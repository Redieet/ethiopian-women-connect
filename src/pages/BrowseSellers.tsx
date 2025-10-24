import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, 
  Star, 
  MapPin, 
  Users, 
  ShoppingBag, 
  ArrowLeft, 
  Home,
  Filter,
  Grid,
  List,
  CheckCircle,
  MessageCircle,
  Heart,
  Eye,
  Package
} from "lucide-react";
import { sampleSellers, productCategories, Seller } from "@/data/sampleData";

const BrowseSellers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [showProducts, setShowProducts] = useState(false);

  const filteredSellers = sampleSellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || seller.productType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedSellers = [...filteredSellers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "sales":
        return b.totalSales - a.totalSales;
      case "followers":
        return b.followers - a.followers;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Get all products from all sellers
  const allProducts = sampleSellers.flatMap(seller => 
    seller.products.map(product => ({
      ...product,
      seller: seller,
      sellerName: seller.name,
      sellerBusiness: seller.businessName,
      sellerLocation: seller.location,
      sellerVerified: seller.verified
    }))
  );

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.seller.productType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "sales":
        return b.reviews - a.reviews;
      case "price":
        return a.price - b.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const renderProductCard = (product: any) => (
    <Card key={`${product.seller.id}-${product.id}`} className="p-4 border-2 border-border hover:border-primary/50 transition-all group">
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2">
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        {product.sellerVerified && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Link to={`/seller-profile/${product.seller.id}`} className="text-sm text-primary hover:underline">
              {product.sellerBusiness}
            </Link>
            {product.sellerVerified && <CheckCircle className="w-4 h-4 text-green-600" />}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{product.sellerLocation}</span>
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-primary">{product.price} ETB</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link to={`/product-detail/${product.id}`}>
            <Button variant="hero" className="flex-1">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </Link>
          <Button variant="outline">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderSellerCard = (seller: Seller) => (
    <Card key={seller.id} className="p-6 border-2 border-border hover:border-primary/50 transition-all group">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={seller.profileImage}
            alt={seller.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {seller.verified && (
            <div className="flex justify-center mt-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {seller.name}
              </h3>
              <p className="text-sm text-muted-foreground">{seller.businessName}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{seller.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{seller.location}</span>
            <Badge variant="secondary" className="text-xs">
              {seller.productType}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {seller.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" />
              <span>{seller.totalSales} sales</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{seller.followers} followers</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/seller-profile/${seller.id}`}>
              <Button variant="hero" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderSellerListItem = (seller: Seller) => (
    <Card key={seller.id} className="p-4 border-2 border-border hover:border-primary/50 transition-all group">
      <div className="flex items-center gap-4">
        <img
          src={seller.profileImage}
          alt={seller.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {seller.name}
            </h3>
            {seller.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
            <Badge variant="secondary" className="text-xs">
              {seller.productType}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{seller.businessName}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{seller.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{seller.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-3 h-3" />
              <span>{seller.totalSales} sales</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link to={`/seller-profile/${seller.id}`}>
            <Button variant="hero" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6 flex gap-4">
            <Link to="/buyer-dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-foreground">Browse </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sellers & Products
              </span>
            </h1>
            <p className="text-muted-foreground">Discover verified women entrepreneurs and their amazing products</p>
          </div>

          {/* Toggle between Sellers and Products */}
          <div className="mb-6">
            <div className="flex gap-2">
              <Button
                variant={!showProducts ? "default" : "outline"}
                onClick={() => setShowProducts(false)}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Sellers
              </Button>
              <Button
                variant={showProducts ? "default" : "outline"}
                onClick={() => setShowProducts(true)}
                className="flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Products
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 border-2 border-border mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={showProducts ? "Search products..." : "Search sellers..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {showProducts ? (
                    <>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="sales">Reviews</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="sales">Total Sales</SelectItem>
                      <SelectItem value="followers">Followers</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {showProducts ? sortedProducts.length : sortedSellers.length} {showProducts ? 'products' : 'sellers'}
              </p>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters</span>
              </div>
            </div>
          </Card>

          {/* Content Grid/List */}
          {showProducts ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
              {sortedProducts.map(product => renderProductCard(product))}
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedSellers.map(seller => 
                viewMode === "grid" ? renderSellerCard(seller) : renderSellerListItem(seller)
              )}
            </div>
          )}

          {((showProducts && sortedProducts.length === 0) || (!showProducts && sortedSellers.length === 0)) && (
            <Card className="p-12 text-center border-2 border-border">
              <div className="max-w-md mx-auto">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No {showProducts ? 'products' : 'sellers'} found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse different categories.
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseSellers;