import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  FileText, 
  Camera, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Download,
  Upload,
  AlertTriangle,
  UserCheck,
  Building,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

const AdminVerification = () => {
  const [activeTab, setActiveTab] = useState("pending");

  // Mock data for demonstration
  const verificationApplications = [
    {
      id: "APP001",
      name: "Sara Alemayehu",
      businessName: "Sara's Coffee House",
      email: "sara@example.com",
      phone: "+251 9X XXX XXXX",
      productType: "Food & Beverages",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
      documents: {
        idDocument: "uploaded",
        faceVideo: "uploaded",
        businessRegistration: "uploaded",
        bankStatement: "uploaded"
      },
      verificationScore: 85
    },
    {
      id: "APP002", 
      name: "Marta Tesfaye",
      businessName: "Marta's Crafts",
      email: "marta@example.com",
      phone: "+251 9X XXX XXXX",
      productType: "Handmade Crafts",
      status: "approved",
      submittedAt: "2024-01-14T14:20:00Z",
      documents: {
        idDocument: "verified",
        faceVideo: "verified",
        businessRegistration: "not_required",
        bankStatement: "verified"
      },
      verificationScore: 92
    },
    {
      id: "APP003",
      name: "Rahel Worku",
      businessName: "Rahel's Fashion",
      email: "rahel@example.com", 
      phone: "+251 9X XXX XXXX",
      productType: "Fashion & Clothing",
      status: "rejected",
      submittedAt: "2024-01-13T09:15:00Z",
      documents: {
        idDocument: "rejected",
        faceVideo: "pending",
        businessRegistration: "not_required",
        bankStatement: "rejected"
      },
      verificationScore: 45,
      rejectionReason: "ID document quality is poor and face verification failed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "verified":
        return <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Verified</span>;
      case "rejected":
        return <span className="text-red-600 flex items-center gap-1"><XCircle className="w-3 h-3" />Rejected</span>;
      case "uploaded":
        return <span className="text-blue-600 flex items-center gap-1"><Eye className="w-3 h-3" />Review</span>;
      case "not_required":
        return <span className="text-gray-500">Not Required</span>;
      default:
        return <span className="text-gray-500">Pending</span>;
    }
  };

  const handleApprove = (applicationId: string) => {
    toast.success("Application approved successfully!");
    // In real implementation, this would update the database
  };

  const handleReject = (applicationId: string) => {
    toast.error("Application rejected");
    // In real implementation, this would update the database and send notification
  };

  const handleViewDocument = (applicationId: string, documentType: string) => {
    toast.info(`Opening ${documentType} for application ${applicationId}`);
    // In real implementation, this would open the document viewer
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-foreground">Seller Verification </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-muted-foreground">Review and manage seller verification applications</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Clock className="w-8 h-8 text-yellow-600 mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">12</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">45</div>
              <div className="text-sm text-muted-foreground">Approved Today</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <XCircle className="w-8 h-8 text-red-600 mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">3</div>
              <div className="text-sm text-muted-foreground">Rejected Today</div>
            </Card>
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
              <Users className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">156</div>
              <div className="text-sm text-muted-foreground">Total Verified</div>
            </Card>
          </div>

          {/* Verification Management */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              <div className="grid gap-6">
                {verificationApplications
                  .filter(app => app.status === "pending")
                  .map((application) => (
                    <Card key={application.id} className="p-6 border-2 border-border">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{application.name}</h3>
                          <p className="text-muted-foreground">{application.businessName}</p>
                          <p className="text-sm text-muted-foreground">{application.email} • {application.phone}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(application.status)}
                          <p className="text-sm text-muted-foreground mt-1">
                            Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Document Status
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">ID Document:</span>
                              <div className="flex items-center gap-2">
                                {getDocumentStatus(application.documents.idDocument)}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDocument(application.id, "ID Document")}
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Face Video:</span>
                              <div className="flex items-center gap-2">
                                {getDocumentStatus(application.documents.faceVideo)}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDocument(application.id, "Face Video")}
                                >
                                  <Camera className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Business Registration:</span>
                              <div className="flex items-center gap-2">
                                {getDocumentStatus(application.documents.businessRegistration)}
                                {application.documents.businessRegistration !== "not_required" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewDocument(application.id, "Business Registration")}
                                  >
                                    <FileText className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Bank Statement:</span>
                              <div className="flex items-center gap-2">
                                {getDocumentStatus(application.documents.bankStatement)}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDocument(application.id, "Bank Statement")}
                                >
                                  <CreditCard className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Verification Details
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Product Type:</span>
                              <span className="text-sm font-medium">{application.productType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Verification Score:</span>
                              <span className="text-sm font-medium text-primary">{application.verificationScore}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Application ID:</span>
                              <span className="text-sm font-mono">{application.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleApprove(application.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleReject(application.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Application
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="space-y-6">
              <div className="grid gap-6">
                {verificationApplications
                  .filter(app => app.status === "approved")
                  .map((application) => (
                    <Card key={application.id} className="p-6 border-2 border-green-200 bg-green-50/50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{application.name}</h3>
                          <p className="text-muted-foreground">{application.businessName}</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(application.status)}
                          <p className="text-sm text-muted-foreground mt-1">
                            Approved: {new Date(application.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="space-y-6">
              <div className="grid gap-6">
                {verificationApplications
                  .filter(app => app.status === "rejected")
                  .map((application) => (
                    <Card key={application.id} className="p-6 border-2 border-red-200 bg-red-50/50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{application.name}</h3>
                          <p className="text-muted-foreground">{application.businessName}</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                          {application.rejectionReason && (
                            <div className="mt-2 p-3 bg-red-100 border border-red-200 rounded">
                              <p className="text-sm text-red-800">
                                <AlertTriangle className="w-4 h-4 inline mr-1" />
                                {application.rejectionReason}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          {getStatusBadge(application.status)}
                          <p className="text-sm text-muted-foreground mt-1">
                            Rejected: {new Date(application.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Verification Video Management */}
          <Card className="p-6 border-2 border-border mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Verification Guide Videos
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload and manage instructional videos to help sellers complete the verification process.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Current Videos</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">Face Verification Guide</p>
                      <p className="text-sm text-muted-foreground">How to record your verification video</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">Document Upload Guide</p>
                      <p className="text-sm text-muted-foreground">How to properly photograph your documents</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Upload New Video</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a new instructional video
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="videoUpload"
                  />
                  <Button
                    onClick={() => document.getElementById("videoUpload")?.click()}
                    variant="outline"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Video File
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminVerification;
