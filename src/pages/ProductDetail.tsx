import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  Star, 
  MapPin, 
  Users, 
  ShoppingBag, 
  CheckCircle,
  MessageCircle,
  Heart,
  Share2,
  Phone,
  Mail,
  ExternalLink,
  Package,
  Truck,
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { sampleSellers } from "@/data/sampleData";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Find the product from sample data
  const findProduct = () => {
    for (const seller of sampleSellers) {
      const product = seller.products.find(p => p.id === id);
      if (product) {
        return {
          ...product,
          seller: seller.name,
          sellerBusiness: seller.businessName,
          sellerLocation: seller.location,
          sellerVerified: seller.verified,
          sellerId: seller.id,
          sellerInfo: {
            name: seller.name,
            businessName: seller.businessName,
            email: seller.email,
            phone: seller.phone,
            rating: seller.rating,
            totalSales: seller.totalSales,
            followers: seller.followers,
            verified: seller.verified,
            profileImage: seller.profileImage,
            socialMedia: seller.socialMedia
          },
          sold: 0,
          images: [
            product.image,
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
          ],
          specifications: {
            "Material": "Premium cotton blend",
            "Size": "One size fits all",
            "Color": "Traditional Ethiopian patterns",
            "Care Instructions": "Hand wash cold, air dry",
            "Origin": "Made in Ethiopia",
            "Weight": "0.5 kg"
          },
          reviews: [
            {
              name: "Alem K.",
              rating: 5,
              comment: "Absolutely beautiful dress! The quality is amazing and it fits perfectly. Highly recommend!",
              date: "2 days ago"
            },
            {
              name: "Sara M.",
              rating: 5,
              comment: "Love the traditional design. Perfect for special occasions and the craftsmanship is excellent.",
              date: "1 week ago"
            },
            {
              name: "Rahel T.",
              rating: 4,
              comment: "Great quality and beautiful patterns. Seller was very helpful with sizing questions.",
              date: "2 weeks ago"
            }
          ]
        };
      }
    }
    return null;
  };

  const product = findProduct();

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Link to="/browse-sellers">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6 flex gap-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Images */}
            <div className="lg:col-span-2">
              <Card className="p-6 border-2 border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {product.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.name} ${index + 2}`}
                          className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                          <div className="flex items-center gap-2 mb-2">
                            <Link to={`/seller-profile/${product.sellerId}`}>
                              <span className="text-lg text-primary hover:underline">{product.seller}</span>
                            </Link>
                            {product.sellerVerified && <CheckCircle className="w-5 h-5 text-green-600" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{product.sellerLocation}</span>
                            <Badge variant="secondary">{product.category}</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="text-lg font-bold">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{product.sold ?? 0} sold</span>
                        </div>
                      </div>
                      
                      <div className="text-3xl font-bold text-primary mb-4">
                        {product.price} ETB
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{product.description}</p>
                      
                      <div className="flex gap-3 mb-6">
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4 mr-2" />
                          Add to Wishlist
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Product Actions */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-border">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{product.price} ETB</div>
                    <div className="text-sm text-muted-foreground">+ 150 ETB delivery fee</div>
                    <div className="text-lg font-semibold text-foreground mt-2">
                      Total: {product.price + 150} ETB
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link to={`/payment/${product.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Buy Now
                      </Button>
                    </Link>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Heart className="w-4 h-4 mr-2" />
                        Add to Wishlist
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact Seller
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Buyer Protection</h4>
                        <p className="text-sm text-blue-700">
                          Your payment is held securely until you confirm delivery. 
                          Full refund if not satisfied.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Seller Info */}
              <Card className="p-6 border-2 border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Seller Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.sellerInfo.profileImage}
                      alt={product.seller}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{product.seller}</div>
                      <div className="text-sm text-muted-foreground">{product.sellerBusiness}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{product.sellerInfo.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{product.sellerInfo.followers} followers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                      <span>{product.sellerInfo.totalSales} sales</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card className="p-6 border-2 border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card className="p-6 border-2 border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium text-foreground">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6 border-2 border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">{review.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <Card className="p-6 border-2 border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">Delivery Time</div>
                        <div className="text-sm text-muted-foreground">2-5 business days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">Delivery Fee</div>
                        <div className="text-sm text-muted-foreground">150 ETB nationwide</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">Insurance</div>
                        <div className="text-sm text-muted-foreground">Included in delivery fee</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;