import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get("tab") || "signin";
  const defaultRole = searchParams.get("role") || "buyer";
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("✅ Thank you! This is a demo version — backend connection coming soon.", {
        description: "Welcome back! You've been signed in successfully.",
      });
      setIsSubmitting(false);
      // Navigate based on role for admin login
      if (selectedRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
    }, 1500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("✅ Thank you! This is a demo version — backend connection coming soon.", {
        description: "Account created successfully! Welcome to ምን አለሽ?",
      });
      setIsSubmitting(false);
      // Navigate based on selected role
      if (selectedRole === "seller") {
        navigate("/seller-dashboard");
      } else if (selectedRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-primary/5 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl">
              <Heart className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ምን አለሽ?
            </span>
          </div>
          <p className="text-muted-foreground">Welcome back! Sign in to continue</p>
        </div>

        <Card className="p-8 shadow-[var(--shadow-soft)]">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>I want to</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={selectedRole === "buyer" ? "default" : "outline"}
                      onClick={() => setSelectedRole("buyer")}
                      className="w-full"
                    >
                      Buy
                    </Button>
                    <Button
                      type="button"
                      variant={selectedRole === "seller" ? "default" : "outline"}
                      onClick={() => setSelectedRole("seller")}
                      className="w-full"
                    >
                      Sell
                    </Button>
                    <Button
                      type="button"
                      variant={selectedRole === "admin" ? "default" : "outline"}
                      onClick={() => setSelectedRole("admin")}
                      className="w-full"
                    >
                      Admin
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
