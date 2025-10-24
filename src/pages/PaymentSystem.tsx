import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  Star, 
  MapPin, 
  ShoppingBag, 
  CheckCircle,
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  Truck,
  Clock,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { sampleSellers } from "@/data/sampleData";
import { createOrder, processPayment, createNotification, EMAIL_ADDRESSES } from "@/data/escrowSystem";

const PaymentSystem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: ""
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

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
            socialMedia: seller.socialMedia
          }
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

  const paymentMethods = [
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Pay with Telebirr mobile money",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <Globe className="w-6 h-6" />,
      description: "Pay with PayPal account",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "mastercard",
      name: "Mastercard",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Pay with Mastercard",
      color: "bg-red-100 text-red-800"
    },
    {
      id: "visa",
      name: "Visa",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Pay with Visa card",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: <Shield className="w-6 h-6" />,
      description: "Direct bank transfer",
      color: "bg-green-100 text-green-800"
    },
    {
      id: "cash_on_delivery",
      name: "Cash on Delivery",
      icon: <Truck className="w-6 h-6" />,
      description: "Pay when you receive the product",
      color: "bg-gray-100 text-gray-800"
    }
  ];

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (!deliveryAddress.fullName || !deliveryAddress.phone || !deliveryAddress.address) {
      toast.error("Please fill in all required delivery information");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order
      const order = createOrder({
        productId: product.id,
        productName: product.name,
        sellerId: product.sellerId,
        sellerName: product.seller.name,
        buyerName: deliveryAddress.fullName,
        buyerEmail: "buyer@example.com", // In real app, get from user session
        amount: product.price,
        deliveryFee: 150, // Fixed delivery fee
        totalAmount: product.price + 150,
        paymentMethod: selectedPayment
      });

      // Process payment
      const processedOrder = processPayment(order);
      
      // Create notifications
      const adminNotification = createNotification(
        "order_created",
        "admin",
        "admin-001",
        EMAIL_ADDRESSES.ADMIN,
        order.id,
        processedOrder
      );

      const sellerNotification = createNotification(
        "payment_received",
        "seller",
        product.sellerId,
        product.sellerInfo.email,
        order.id,
        processedOrder
      );

      const buyerNotification = createNotification(
        "payment_received",
        "buyer",
        "buyer-001",
        "buyer@example.com",
        order.id,
        processedOrder
      );

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      setOrderDetails(processedOrder);
      setShowSuccess(true);

      toast.success("✅ Payment successful! Order created and notifications sent.", {
        description: `Order ID: ${processedOrder.id} | Delivery Code: ${processedOrder.deliveryCode}`,
        duration: 5000
      });

    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
        <Navigation />
        
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="p-8 border-2 border-green-200 bg-green-50/50">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-800 mb-2">Payment Successful!</h1>
                <p className="text-green-700">Your order has been placed and payment is secured in escrow.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <h2 className="text-xl font-bold text-foreground mb-4">Order Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="font-medium ml-2">{orderDetails.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Delivery Code:</span>
                      <span className="font-medium ml-2">{orderDetails.deliveryCode}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Product:</span>
                      <span className="font-medium ml-2">{orderDetails.productName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Seller:</span>
                      <span className="font-medium ml-2">{orderDetails.sellerName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-medium ml-2">{orderDetails.totalAmount} ETB</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="font-medium ml-2 capitalize">{orderDetails.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Escrow Protection
                  </h3>
                  <p className="text-blue-700 text-sm mb-4">
                    Your payment is securely held in escrow until you confirm delivery. 
                    The seller will only receive payment after you confirm receipt of the product.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Payment secured in escrow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Admin notified of new order</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Seller notified of payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Waiting for seller to ship</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Notifications Sent
                  </h3>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div>📧 Admin: {EMAIL_ADDRESSES.ADMIN}</div>
                    <div>📧 Seller: {orderDetails.sellerName}</div>
                    <div>📧 Buyer: You will receive updates via email</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate("/buyer-dashboard")}
                    className="flex-1"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/browse-sellers")}
                    className="flex-1"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </Card>
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation */}
          <div className="mb-6 flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Summary */}
            <Card className="p-6 border-2 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {product.sellerBusiness}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product Price:</span>
                  <span className="font-medium">{product.price} ETB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee:</span>
                  <span className="font-medium">150 ETB</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary border-t border-border pt-2">
                  <span>Total:</span>
                  <span>{product.price + 150} ETB</span>
                </div>
              </div>
            </Card>

            {/* Payment Form */}
            <Card className="p-6 border-2 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Payment & Delivery</h2>
              
              <div className="space-y-6">
                {/* Delivery Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={deliveryAddress.fullName}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+251 9X XXX XXXX"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        value={deliveryAddress.address}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Street address, building, apartment"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Addis Ababa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="region">Region</Label>
                      <Input
                        id="region"
                        value={deliveryAddress.region}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, region: e.target.value }))}
                        placeholder="Addis Ababa"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${method.color}`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{method.name}</h4>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="text-sm font-medium">
                      I agree to the Terms and Conditions *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you agree to our terms of service, privacy policy, and the escrow payment system. 
                      Your payment will be held securely until delivery confirmation.
                    </p>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={!selectedPayment || !termsAccepted || isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Pay Securely with Escrow
                    </>
                  )}
                </Button>

                {/* Escrow Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Escrow Protection</h4>
                      <p className="text-sm text-blue-700">
                        Your payment is held securely until you confirm delivery. 
                        The seller receives payment only after successful delivery confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSystem;
