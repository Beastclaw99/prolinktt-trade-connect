
import React from "react";
import { FormControl, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleSelectorProps {
  value: "client" | "professional";
  onChange: (value: "client" | "professional") => void;
}

const RoleOption = ({ 
  value, 
  icon, 
  title, 
  description, 
  selected 
}: { 
  value: "client" | "professional";
  icon: JSX.Element;
  title: string;
  description: string;
  selected: boolean;
}) => (
  <FormItem className="flex-1">
    <FormControl>
      <label
        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
          selected ? "border-primary" : "border-muted"
        }`}
      >
        <RadioGroupItem 
          value={value} 
          id={value} 
          className="sr-only" 
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          {icon}
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground text-center">{description}</div>
        </div>
      </label>
    </FormControl>
  </FormItem>
);

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  // Icons
  const clientIcon = (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 16V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 16H21V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const professionalIcon = (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6L16.5 3.5L18 5L15.5 7.5M14 6L15.5 7.5M14 6L11.5 8.5M15.5 7.5L11.5 11.5M11.5 8.5L4 16V20H8L15.5 12.5M11.5 8.5L11.5 11.5M11.5 11.5L15.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <RadioGroup
      className="flex flex-col md:flex-row gap-4"
      value={value}
      onValueChange={onChange}
    >
      <RoleOption 
        value="client" 
        icon={clientIcon}
        title="Hire Professionals"
        description="Post jobs and hire skilled tradespeople"
        selected={value === "client"}
      />
      
      <RoleOption 
        value="professional" 
        icon={professionalIcon}
        title="Find Work"
        description="Browse job listings and offer your services"
        selected={value === "professional"}
      />
    </RadioGroup>
  );
};

export default RoleSelector;
