
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  role: z.enum(["client", "professional"], {
    required_error: "Please select a user type.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "client",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      await signUp(data.email, data.password, {
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Join ProLinkTT to connect with skilled professionals or find jobs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I want to...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col md:flex-row gap-4"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <div className="flex-1">
                        <label
                          className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
                            field.value === "client" 
                              ? "border-primary" 
                              : "border-muted"
                          }`}
                        >
                          <FormControl>
                            <RadioGroupItem 
                              value="client" 
                              id="client" 
                              className="sr-only" 
                              checked={field.value === "client"}
                              onChange={() => field.onChange("client")}
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 16V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 16H21V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 5V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="font-medium">Hire Professionals</div>
                            <div className="text-xs text-muted-foreground text-center">Post jobs and hire skilled tradespeople</div>
                          </div>
                        </label>
                      </div>

                      <div className="flex-1">
                        <label
                          className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
                            field.value === "professional" 
                              ? "border-primary" 
                              : "border-muted"
                          }`}
                        >
                          <FormControl>
                            <RadioGroupItem 
                              value="professional" 
                              id="professional" 
                              className="sr-only"
                              checked={field.value === "professional"}
                              onChange={() => field.onChange("professional")} 
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 6L16.5 3.5L18 5L15.5 7.5M14 6L15.5 7.5M14 6L11.5 8.5M15.5 7.5L11.5 11.5M11.5 8.5L4 16V20H8L15.5 12.5M11.5 8.5L11.5 11.5M11.5 11.5L15.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="font-medium">Find Work</div>
                            <div className="text-xs text-muted-foreground text-center">Browse job listings and offer your services</div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          By signing up, you agree to our{" "}
          <Link to="#" className="text-prolink-blue hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="#" className="text-prolink-blue hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-prolink-blue hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
