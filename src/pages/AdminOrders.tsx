import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Truck, 
  Package, 
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { mockOrders, mockEscrowTransactions, shipOrder, deliverOrder, releasePayment, createNotification, EMAIL_ADDRESSES } from "@/data/escrowSystem";

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [escrowTransactions, setEscrowTransactions] = useState(mockEscrowTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [logisticsDriver, setLogisticsDriver] = useState({
    id: "",
    name: "",
    phone: "",
    email: ""
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleShipOrder = (orderId: string) => {
    if (!logisticsDriver.id || !logisticsDriver.name) {
      alert("Please fill in logistics driver information");
      return;
    }

    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrder = shipOrder(order, logisticsDriver.id, logisticsDriver.name);
    setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));

    // Create notification for buyer
    const notification = createNotification(
      "order_shipped",
      "buyer",
      order.buyerId,
      order.buyerEmail,
      orderId,
      updatedOrder
    );

    alert(`Order ${orderId} has been shipped! Tracking: ${updatedOrder.trackingNumber}`);
    setLogisticsDriver({ id: "", name: "", phone: "", email: "" });
  };

  const handleDeliverOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrder = deliverOrder(order);
    setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));

    // Release payment to seller
    const escrowTransaction = releasePayment(updatedOrder);
    setEscrowTransactions(prev => [...prev, escrowTransaction]);

    // Create notifications
    const sellerNotification = createNotification(
      "payment_released",
      "seller",
      order.sellerId,
      "seller@example.com", // In real app, get from seller data
      orderId,
      updatedOrder
    );

    const buyerNotification = createNotification(
      "order_delivered",
      "buyer",
      order.buyerId,
      order.buyerEmail,
      orderId,
      updatedOrder
    );

    alert(`Order ${orderId} delivered! Payment released to seller.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle2 className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <Package className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Order Management</h1>
            <p className="text-muted-foreground">Manage orders, escrow payments, and logistics</p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-8 border-2 border-border">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by product, seller, buyer, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Filter by Status</Label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Orders List */}
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-6 border-2 border-border hover:border-primary/50 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getStatusColor(order.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">Order ID: {order.id}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">Delivery Code: {order.deliveryCode}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">{order.productName}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Seller:</span>
                        <span className="font-medium ml-2">{order.sellerName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Buyer:</span>
                        <span className="font-medium ml-2">{order.buyerName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium ml-2 text-primary">{order.totalAmount} ETB</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-medium ml-2 capitalize">{order.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <span className="text-muted-foreground">Tracking:</span>
                          <span className="font-medium ml-2">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetails(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    
                    {order.status === 'paid' && (
                      <Button
                        onClick={() => handleShipOrder(order.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Ship Order
                      </Button>
                    )}
                    
                    {order.status === 'shipped' && (
                      <Button
                        onClick={() => handleDeliverOrder(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <Card className="p-12 text-center border-2 border-border">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </Card>
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOrderDetails(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Order ID</Label>
                    <p className="font-medium">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <Label>Product</Label>
                    <p className="font-medium">{selectedOrder.productName}</p>
                  </div>
                  <div>
                    <Label>Total Amount</Label>
                    <p className="font-medium text-primary">{selectedOrder.totalAmount} ETB</p>
                  </div>
                </div>

                {/* Logistics Driver Info (for shipping) */}
                {selectedOrder.status === 'paid' && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Assign Logistics Driver</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="driverId">Driver ID</Label>
                        <Input
                          id="driverId"
                          value={logisticsDriver.id}
                          onChange={(e) => setLogisticsDriver(prev => ({ ...prev, id: e.target.value }))}
                          placeholder="LOG-001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="driverName">Driver Name</Label>
                        <Input
                          id="driverName"
                          value={logisticsDriver.name}
                          onChange={(e) => setLogisticsDriver(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="driverPhone">Phone</Label>
                        <Input
                          id="driverPhone"
                          value={logisticsDriver.phone}
                          onChange={(e) => setLogisticsDriver(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+251 9X XXX XXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="driverEmail">Email</Label>
                        <Input
                          id="driverEmail"
                          value={logisticsDriver.email}
                          onChange={(e) => setLogisticsDriver(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="driver@example.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Escrow Information */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Escrow Information</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Seller Amount:</span>
                        <p className="font-medium">{Math.floor(selectedOrder.totalAmount * 0.8)} ETB (80%)</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Logistics Amount:</span>
                        <p className="font-medium">{Math.floor(selectedOrder.totalAmount * 0.1)} ETB (10%)</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Platform Fee:</span>
                        <p className="font-medium">{Math.floor(selectedOrder.totalAmount * 0.1)} ETB (10%)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notifications Sent</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Admin: {EMAIL_ADDRESSES.ADMIN}</span>
                      {selectedOrder.adminNotificationSent && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Seller: {selectedOrder.sellerName}</span>
                      {selectedOrder.sellerNotificationSent && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Buyer: {selectedOrder.buyerEmail}</span>
                      {selectedOrder.buyerNotificationSent && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    {selectedOrder.logisticsDriverId && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>Logistics: {logisticsDriver.email}</span>
                        {selectedOrder.logisticsNotificationSent && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminOrders;
