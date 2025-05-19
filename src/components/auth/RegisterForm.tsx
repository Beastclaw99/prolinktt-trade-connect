
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseBusiness, User } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') === 'professional' ? 'professional' : 'client';
  const [accountType, setAccountType] = useState<string>(initialType);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would handle registration with a backend service
      console.log("Account type:", accountType);
      console.log("Registration data:", formData);
      
      // Redirect to dashboard based on account type
      const dashboardRoute = accountType === 'professional' 
        ? '/professional-dashboard' 
        : '/client-dashboard';
        
      navigate(dashboardRoute);
    }
  };
  
  return (
    <div className="w-full max-w-md">
      <Card className="border shadow-lg">
        <Tabs value={accountType} onValueChange={setAccountType}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Choose your account type and fill in your details
            </CardDescription>
            <TabsList className="grid grid-cols-2 mt-4">
              <TabsTrigger value="client" className="data-[state=active]:bg-prolink-blue data-[state=active]:text-white">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Client
              </TabsTrigger>
              <TabsTrigger value="professional" className="data-[state=active]:bg-prolink-green data-[state=active]:text-white">
                <User className="mr-2 h-4 w-4" />
                Professional
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <TabsContent value="client">
                <p className="text-sm text-gray-600 mb-4">
                  Create a client account to post jobs and hire trade professionals
                </p>
              </TabsContent>
              
              <TabsContent value="professional">
                <p className="text-sm text-gray-600 mb-4">
                  Create a professional account to find jobs and showcase your skills
                </p>
              </TabsContent>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className={`w-full ${accountType === 'client' ? 'btn-primary' : 'btn-secondary'}`}>
                Create Account
              </Button>
              
              <p className="text-sm text-gray-600 text-center">
                Already have an account? <Link to="/login" className="text-prolink-blue hover:underline">Log in</Link>
              </p>
            </CardFooter>
          </form>
        </Tabs>
      </Card>
    </div>
  );
};

export default RegisterForm;
