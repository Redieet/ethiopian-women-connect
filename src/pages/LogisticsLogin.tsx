import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  Truck, 
  Shield, 
  Mail, 
  Lock, 
  Building2,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

// Predefined list of approved logistics partner emails
const allowedLogisticsEmails = [
  "selambus@mnalesh.com",
  "abaybus@mnalesh.com", 
  "skybus@mnalesh.com",
  "ethiopianbus@mnalesh.com",
  "nationalbus@mnalesh.com",
  "expresslogistics@mnalesh.com",
  "rapiddelivery@mnalesh.com",
  "premiumtransport@mnalesh.com"
];

// Company names mapping for welcome message
const companyNames: { [key: string]: string } = {
  "selambus@mnalesh.com": "Selam Bus Transport",
  "abaybus@mnalesh.com": "Abay Bus Services",
  "skybus@mnalesh.com": "Sky Bus Express",
  "ethiopianbus@mnalesh.com": "Ethiopian Bus Company",
  "nationalbus@mnalesh.com": "National Bus Lines",
  "expresslogistics@mnalesh.com": "Express Logistics",
  "rapiddelivery@mnalesh.com": "Rapid Delivery Co.",
  "premiumtransport@mnalesh.com": "Premium Transport Ltd."
};

const LogisticsLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate login delay (1.5s) to make it look realistic
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Check if email is in the allowed list
      const normalizedEmail = email.toLowerCase().trim();
      
      if (allowedLogisticsEmails.includes(normalizedEmail)) {
        // Login successful
        const companyName = companyNames[normalizedEmail] || "Logistics Partner";
        
        toast.success(`Welcome, ${companyName}!`, {
          description: "Your deliveries dashboard is ready.",
          duration: 4000
        });

        // Store login info in localStorage for demo purposes
        localStorage.setItem('logisticsPartner', JSON.stringify({
          email: normalizedEmail,
          companyName: companyName,
          loginTime: new Date().toISOString()
        }));

        // Redirect to logistics dashboard
        navigate("/logistics-dashboard");
      } else {
        // Access denied
        setError("Access denied. Only verified logistics partners can log in.");
        toast.error("Access Denied", {
          description: "Your email is not registered as a logistics partner.",
          duration: 5000
        });
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error("Login Error", {
        description: "Something went wrong. Please try again.",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-md">
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

          {/* Login Card */}
          <Card className="p-8 border-2 border-border shadow-lg">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Truck className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Logistics Partner Login
              </h1>
              <p className="text-muted-foreground">
                Access your deliveries dashboard
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Company Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your-company@mnalesh.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    disabled={isLoading}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Use your registered company email address
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying Access...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Partner Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Verified Partners Only</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    This portal is exclusively for registered logistics partners of ምን አለሽ?.
                  </p>
                  <p className="text-xs text-blue-600">
                    Need access? Contact our partnership team at partnerships@mnalesh.com
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Demo Mode</h4>
                  <p className="text-sm text-yellow-700 mb-2">
                    Try logging in with any of these demo partner emails:
                  </p>
                  <div className="text-xs text-yellow-600 space-y-1">
                    <div>• selambus@mnalesh.com</div>
                    <div>• abaybus@mnalesh.com</div>
                    <div>• skybus@mnalesh.com</div>
                  </div>
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

export default LogisticsLogin;
