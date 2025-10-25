import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  Truck,
  Clock,
  CheckCircle2,
  Home,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import {
  createOrder,
  processPayment,
  createNotification,
  EMAIL_ADDRESSES,
} from "@/data/escrowSystem";

interface PaymentSystemProps {
  userId: string;
  open: boolean;
  onClose: () => void;
  priceBirr: number;
  productName: string;
}

const PaymentSystem: React.FC<PaymentSystemProps> = ({
  userId,
  open,
  onClose,
  priceBirr,
  productName,
}) => {
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const deliveryFee = 150;
  const subtotal = priceBirr;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + deliveryFee - discountAmount;

  const paymentMethods = [
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Pay with Telebirr mobile money",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <Globe className="w-6 h-6" />,
      description: "Pay with PayPal account",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Pay with Mastercard",
      color: "bg-red-100 text-red-800",
    },
    {
      id: "visa",
      name: "Visa",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Pay with Visa card",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: <Shield className="w-6 h-6" />,
      description: "Direct bank transfer",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "cash_on_delivery",
      name: "Cash on Delivery",
      icon: <Truck className="w-6 h-6" />,
      description: "Pay when you receive the product",
      color: "bg-gray-100 text-gray-800",
    },
  ];

  // ✅ Apply numeric-only referral code
  const applyCoupon = () => {
    if (couponApplied) {
      toast.info("Coupon already applied");
      return;
    }

    if (/^[0-9]+$/.test(couponCode.trim())) {
      setDiscount(3); // 3% discount
      setCouponApplied(true);
      toast.success("🎉 Referral code applied! You received a 3% discount.");
    } else {
      toast.error("Invalid referral code. Only numbers are allowed.");
    }
  };

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
      const order = createOrder({
        productId: productName,
        productName,
        sellerId: "seller-001",
        sellerName: "Demo Seller",
        buyerName: deliveryAddress.fullName,
        buyerEmail: "buyer@example.com",
        amount: subtotal,
        deliveryFee,
        totalAmount: total,
        paymentMethod: selectedPayment,
      });

      const processedOrder = processPayment(order);

      createNotification("order_created", "admin", "admin-001", EMAIL_ADDRESSES.ADMIN, order.id, processedOrder);
      createNotification("payment_received", "seller", "seller-001", "seller@example.com", order.id, processedOrder);
      createNotification("payment_received", "buyer", userId, "buyer@example.com", order.id, processedOrder);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setOrderDetails(processedOrder);
      setShowSuccess(true);

      toast.success("✅ Payment successful! Order created and notifications sent.", {
        description: `Order ID: ${processedOrder.id} | Delivery Code: ${processedOrder.deliveryCode}`,
        duration: 5000,
      });
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!open) return null;

  if (showSuccess && orderDetails) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <Card className="p-8 max-w-lg w-full bg-white shadow-xl border-2 border-green-200">
          <div className="text-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
            <p className="text-green-700">
              Your order has been placed and payment is secured in escrow.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div><b>Order ID:</b> {orderDetails.id}</div>
            <div><b>Delivery Code:</b> {orderDetails.deliveryCode}</div>
            <div><b>Total:</b> {orderDetails.totalAmount} ETB</div>
            <div><b>Discount:</b> {discount}%</div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={onClose} className="flex-1">
              <Home className="w-4 h-4 mr-2" /> Close
            </Button>
            <Button variant="outline" onClick={() => navigate("/browse-sellers")} className="flex-1">
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="p-8 max-w-2xl w-full bg-white shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-primary">Secure Payment</h2>

        {/* Order Summary */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between mb-2">
            <span>Product:</span>
            <span className="font-semibold">{productName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Price:</span>
            <span>{priceBirr} ETB</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee:</span>
            <span>{deliveryFee} ETB</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount ({discount}%):</span>
              <span>-{discountAmount.toFixed(2)} ETB</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-primary border-t pt-2">
            <span>Total:</span>
            <span>{total.toFixed(2)} ETB</span>
          </div>
        </div>

        {/* Referral Code */}
        <div className="mb-6">
          <Label htmlFor="coupon">Referral Code (Numbers Only)</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="coupon"
              placeholder="Enter referral code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button onClick={applyCoupon} disabled={couponApplied}>
              {couponApplied ? "Applied" : "Apply"}
            </Button>
          </div>
          {couponApplied && (
            <p className="text-green-600 text-sm mt-2">
              ✅ 3% discount applied successfully!
            </p>
          )}
        </div>

        {/* Delivery Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={deliveryAddress.fullName}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                value={deliveryAddress.phone}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address *</Label>
              <Textarea
                rows={3}
                value={deliveryAddress.address}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          {paymentMethods.map((m) => (
            <div
              key={m.id}
              className={`p-3 border-2 rounded-lg cursor-pointer mb-2 ${
                selectedPayment === m.id ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setSelectedPayment(m.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${m.color}`}>{m.icon}</div>
                <div>
                  <h4 className="font-semibold">{m.name}</h4>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-6">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the Terms and Conditions and Escrow Policy *
          </Label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handlePayment}
            disabled={!selectedPayment || !termsAccepted || isProcessing}
            className="flex-1 py-6"
          >
            {isProcessing ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Pay Securely
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSystem;
