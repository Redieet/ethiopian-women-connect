import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Upload, Camera, Shield, CheckCircle, AlertCircle, FileText, Building, CreditCard, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const SellerVerification = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: "",
    businessName: "",
    productType: "",
    email: "",
    phone: "",
    
    // Step 2: Identity Verification
    idType: "",
    idNumber: "",
    idDocument: null as File | null,
    faceVideo: null as File | null,
    
    // Step 3: Business Verification
    businessRegistration: null as File | null,
    businessLicense: null as File | null,
    taxNumber: "",
    
    // Step 4: Financial Verification
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    bankStatement: null as File | null,
    
    // Step 5: Additional Verification
    address: "",
    utilityBill: null as File | null,
    
    // Step 6: Agreements
    termsAccepted: false,
    privacyAccepted: false,
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    toast.success(`${file.name} uploaded successfully`);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate verification process
    setTimeout(() => {
      toast.success("✅ Verification submitted successfully!", {
        description: "Your application is under review. You'll be notified within 24-48 hours.",
      });
      setIsSubmitting(false);
      navigate("/seller-dashboard");
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Tell us about yourself and your business</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Your full legal name as on ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Your business or brand name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productType">Product/Business Type *</Label>
              <Select value={formData.productType} onValueChange={(value) => handleInputChange("productType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="handmade-crafts">Handmade Crafts</SelectItem>
                  <SelectItem value="food-beverages">Food & Beverages</SelectItem>
                  <SelectItem value="fashion-clothing">Fashion & Clothing</SelectItem>
                  <SelectItem value="beauty-cosmetics">Beauty & Cosmetics</SelectItem>
                  <SelectItem value="home-garden">Home & Garden</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="books-education">Books & Education</SelectItem>
                  <SelectItem value="health-wellness">Health & Wellness</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+251 9X XXX XXXX"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Identity Verification</h2>
              <p className="text-muted-foreground">Verify your identity with government ID and face verification</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type *</Label>
                <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="national-id">National ID</SelectItem>
                    <SelectItem value="drivers-license">Driver's License</SelectItem>
                    <SelectItem value="other">Other Government ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="Your ID number"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload ID Document *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a clear photo of your ID document
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("idDocument", e.target.files[0])}
                    className="hidden"
                    id="idDocument"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("idDocument")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Face Verification Video *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Record a short video of yourself following the instructions
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    You'll be asked to move your head and blink to verify your identity
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("faceVideo", e.target.files[0])}
                    className="hidden"
                    id="faceVideo"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("faceVideo")?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Record Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Business Verification</h2>
              <p className="text-muted-foreground">Provide business registration documents</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Business Registration Certificate</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your business registration certificate (if applicable)
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("businessRegistration", e.target.files[0])}
                    className="hidden"
                    id="businessRegistration"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("businessRegistration")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business License</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your business license (if required for your product type)
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("businessLicense", e.target.files[0])}
                    className="hidden"
                    id="businessLicense"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("businessLicense")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxNumber">Tax Registration Number</Label>
                <Input
                  id="taxNumber"
                  value={formData.taxNumber}
                  onChange={(e) => handleInputChange("taxNumber", e.target.value)}
                  placeholder="Your tax registration number (if applicable)"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Financial Verification</h2>
              <p className="text-muted-foreground">Verify your bank account for secure payments</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  placeholder="Commercial Bank of Ethiopia"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  placeholder="Your bank account number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name *</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                placeholder="Name as it appears on bank account"
                required
              />
              <p className="text-xs text-muted-foreground">
                This name must match the name on your ID document
              </p>
            </div>

            <div className="space-y-2">
              <Label>Bank Statement (Last 3 months)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a recent bank statement showing your account details
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload("bankStatement", e.target.files[0])}
                  className="hidden"
                  id="bankStatement"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("bankStatement")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Additional Verification</h2>
              <p className="text-muted-foreground">Complete your profile with address verification</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Your complete business address"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Address Verification Document</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a utility bill or bank statement showing your address
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload("utilityBill", e.target.files[0])}
                  className="hidden"
                  id="utilityBill"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("utilityBill")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary mb-1">Phone & Email Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    We'll send verification codes to your phone and email. Please have them ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Terms & Agreements</h2>
              <p className="text-muted-foreground">Review and accept our terms of service</p>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Process
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Your documents will be reviewed within 24-48 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Face verification uses secure AI technology
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    All information is encrypted and securely stored
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    You'll receive email updates on your verification status
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="text-sm font-medium">
                      I agree to the Terms of Service *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you agree to our terms of service and seller agreement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="privacy" className="text-sm font-medium">
                      I agree to the Privacy Policy *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      You consent to the collection and processing of your personal data as described in our privacy policy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-accent mb-1">Important Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Providing false information or fraudulent documents will result in immediate account suspension 
                      and may lead to legal action. Please ensure all information is accurate and up-to-date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/auth")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign Up
          </Button>
        </div>

        <Card className="p-8 border-2 border-border">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted || !formData.privacyAccepted || isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Verification"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerVerification;
