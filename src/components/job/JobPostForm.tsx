
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const JobPostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    skills: [],
    paymentType: "fixed",
    budget: {
      min: "",
      max: "",
      hourlyRate: ""
    },
    location: {
      type: "remote",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    },
    timeline: {
      type: "one-time",
      startDate: null as Date | null,
      endDate: null as Date | null,
      estimatedDuration: "",
      durationType: "days"
    },
    attachments: [] as File[],
    isRecurring: false,
    recurringFrequency: "weekly",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: number}[]>([]);

  const categories = [
    "Electrical",
    "Plumbing",
    "Carpentry",
    "HVAC",
    "Masonry",
    "Landscaping",
    "Painting",
    "Other"
  ];

  const subcategories: Record<string, string[]> = {
    "Electrical": ["General Wiring", "Fixture Installation", "Electrical Repairs", "Panel Upgrades"],
    "Plumbing": ["Pipe Installation", "Fixture Replacement", "Drain Cleaning", "Water Heater"],
    "Carpentry": ["Framing", "Cabinetry", "Furniture Making", "Finish Carpentry"],
    "HVAC": ["Installation", "Repair", "Maintenance", "Duct Work"],
    "Masonry": ["Bricklaying", "Stone Work", "Concrete Work", "Repairs"],
    "Landscaping": ["Garden Design", "Lawn Care", "Tree Services", "Irrigation"],
    "Painting": ["Interior", "Exterior", "Decorative", "Commercial"],
    "Other": ["General Maintenance", "Cleaning", "Demolition", "Inspection"]
  };

  const skillsList = [
    "Electrical Wiring", "Pipe Fitting", "Blueprint Reading", "Woodworking",
    "Tile Installation", "Concrete Work", "Equipment Operation", "Welding",
    "Troubleshooting", "Drainage Systems", "HVAC Maintenance", "Cabinetry"
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear errors
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear errors
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleDateChange = (field: "startDate" | "endDate", date: Date | null) => {
    setFormData({
      ...formData,
      timeline: {
        ...formData.timeline,
        [field]: date
      }
    });
  };

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = [...formData.skills];
    
    if (updatedSkills.includes(skill)) {
      const index = updatedSkills.indexOf(skill);
      updatedSkills.splice(index, 1);
    } else {
      updatedSkills.push(skill);
    }
    
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData({ ...formData, attachments: [...formData.attachments, ...fileArray] });
      
      // Create a list of file info for display
      const newFiles = fileArray.map(file => ({
        name: file.name,
        size: file.size
      }));
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...formData.attachments];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, attachments: updatedFiles });
    
    const updatedUploadedFiles = [...uploadedFiles];
    updatedUploadedFiles.splice(index, 1);
    setUploadedFiles(updatedUploadedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.title.trim()) {
      newErrors["title"] = "Job title is required";
      valid = false;
    }
    
    if (!formData.category) {
      newErrors["category"] = "Category is required";
      valid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors["description"] = "Description is required";
      valid = false;
    }
    
    // Budget validation based on payment type
    if (formData.paymentType === "fixed") {
      if (!formData.budget.min.trim()) {
        newErrors["budget.min"] = "Minimum budget is required";
        valid = false;
      }
      if (!formData.budget.max.trim()) {
        newErrors["budget.max"] = "Maximum budget is required";
        valid = false;
      }
      if (parseFloat(formData.budget.min) > parseFloat(formData.budget.max)) {
        newErrors["budget.max"] = "Maximum budget must be greater than minimum budget";
        valid = false;
      }
    } else if (formData.paymentType === "hourly") {
      if (!formData.budget.hourlyRate.trim()) {
        newErrors["budget.hourlyRate"] = "Hourly rate is required";
        valid = false;
      }
    }
    
    // Location validation
    if (formData.location.type === "on-site") {
      if (!formData.location.address.trim()) {
        newErrors["location.address"] = "Address is required for on-site jobs";
        valid = false;
      }
      if (!formData.location.city.trim()) {
        newErrors["location.city"] = "City is required for on-site jobs";
        valid = false;
      }
      if (!formData.location.state.trim()) {
        newErrors["location.state"] = "State is required for on-site jobs";
        valid = false;
      }
      if (!formData.location.zipCode.trim()) {
        newErrors["location.zipCode"] = "Zip code is required for on-site jobs";
        valid = false;
      }
    }
    
    // Timeline validation
    if (formData.timeline.type === "one-time") {
      if (!formData.timeline.startDate) {
        newErrors["timeline.startDate"] = "Start date is required";
        valid = false;
      }
    } else if (formData.timeline.type === "ongoing") {
      if (!formData.timeline.estimatedDuration.trim()) {
        newErrors["timeline.estimatedDuration"] = "Estimated duration is required";
        valid = false;
      }
    }
    
    // If recurring is enabled, frequency must be selected
    if (formData.isRecurring && !formData.recurringFrequency) {
      newErrors["recurringFrequency"] = "Please select a recurring frequency";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit the form data
      console.log("Job post data:", formData);
      
      // Redirect to job postings page
      navigate("/client-dashboard/job-postings");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleTextChange}
            placeholder="e.g., Kitchen Plumbing Renovation"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select 
              value={formData.subcategory} 
              onValueChange={(value) => handleSelectChange("subcategory", value)}
              disabled={!formData.category}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.category ? "Select a subcategory" : "Select a category first"} />
              </SelectTrigger>
              <SelectContent>
                {formData.category && subcategories[formData.category]?.map((subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextChange}
            placeholder="Describe the job in detail, including scope of work, requirements, and specific details."
            rows={6}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <Label>Required Skills</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {skillsList.map((skill) => (
              <div 
                key={skill} 
                className={cn(
                  "border rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
                  formData.skills.includes(skill) 
                    ? "bg-prolink-blue text-white border-prolink-blue" 
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                )}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6 space-y-6">
          <h3 className="font-medium text-lg text-gray-900">Payment Details</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label>Payment Type</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    formData.paymentType === "fixed" 
                      ? "border-prolink-blue bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectChange("paymentType", "fixed")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Fixed Price</span>
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        formData.paymentType === "fixed" 
                          ? "border-prolink-blue bg-prolink-blue" 
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Set a total budget for the entire project
                  </p>
                </div>
                
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    formData.paymentType === "hourly" 
                      ? "border-prolink-blue bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectChange("paymentType", "hourly")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Hourly Rate</span>
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        formData.paymentType === "hourly" 
                          ? "border-prolink-blue bg-prolink-blue" 
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Pay based on the number of hours worked
                  </p>
                </div>
              </div>
            </div>

            {formData.paymentType === "fixed" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget.min">Minimum Budget ($)</Label>
                  <Input
                    id="budget.min"
                    name="budget.min"
                    type="number"
                    value={formData.budget.min}
                    onChange={handleTextChange}
                    placeholder="0.00"
                    min="0"
                  />
                  {errors["budget.min"] && <p className="text-sm text-red-500">{errors["budget.min"]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget.max">Maximum Budget ($)</Label>
                  <Input
                    id="budget.max"
                    name="budget.max"
                    type="number"
                    value={formData.budget.max}
                    onChange={handleTextChange}
                    placeholder="0.00"
                    min="0"
                  />
                  {errors["budget.max"] && <p className="text-sm text-red-500">{errors["budget.max"]}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="budget.hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="budget.hourlyRate"
                  name="budget.hourlyRate"
                  type="number"
                  value={formData.budget.hourlyRate}
                  onChange={handleTextChange}
                  placeholder="0.00"
                  min="0"
                />
                {errors["budget.hourlyRate"] && <p className="text-sm text-red-500">{errors["budget.hourlyRate"]}</p>}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="font-medium text-lg text-gray-900">Location</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label>Location Type</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    formData.location.type === "remote" 
                      ? "border-prolink-blue bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectChange("location.type", "remote")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Remote Work</span>
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        formData.location.type === "remote" 
                          ? "border-prolink-blue bg-prolink-blue" 
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Work can be completed from anywhere
                  </p>
                </div>
                
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    formData.location.type === "on-site" 
                      ? "border-prolink-blue bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectChange("location.type", "on-site")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">On-site</span>
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        formData.location.type === "on-site" 
                          ? "border-prolink-blue bg-prolink-blue" 
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Professional must be physically present
                  </p>
                </div>
              </div>
            </div>

            {formData.location.type === "on-site" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location.address">Address</Label>
                  <Input
                    id="location.address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleTextChange}
                    placeholder="Street address"
                  />
                  {errors["location.address"] && <p className="text-sm text-red-500">{errors["location.address"]}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location.city">City</Label>
                    <Input
                      id="location.city"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleTextChange}
                      placeholder="City"
                    />
                    {errors["location.city"] && <p className="text-sm text-red-500">{errors["location.city"]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location.state">State</Label>
                    <Input
                      id="location.state"
                      name="location.state"
                      value={formData.location.state}
                      onChange={handleTextChange}
                      placeholder="State"
                    />
                    {errors["location.state"] && <p className="text-sm text-red-500">{errors["location.state"]}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location.zipCode">Zip Code</Label>
                  <Input
                    id="location.zipCode"
                    name="location.zipCode"
                    value={formData.location.zipCode}
                    onChange={handleTextChange}
                    placeholder="Zip Code"
                  />
                  {errors["location.zipCode"] && <p className="text-sm text-red-500">{errors["location.zipCode"]}</p>}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="font-medium text-lg text-gray-900">Timeline</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label>Timeline Type</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    formData.timeline.type === "one-time" 
                      ? "border-prolink-blue bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectChange("timeline.type", "one-time")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">One-time Project</span>
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        formData.timeline.type === "one-time" 
                          ? "border-prolink-blue bg-prolink-blue" 
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Project with definite start and end dates
                  </p>
                </div>
                
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    formData.timeline.type === "ongoing" 
                      ? "border-prolink-blue bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectChange("timeline.type", "ongoing")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Ongoing Project</span>
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        formData.timeline.type === "ongoing" 
                          ? "border-prolink-blue bg-prolink-blue" 
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Long-term work with no defined end date
                  </p>
                </div>
              </div>
            </div>

            {formData.timeline.type === "one-time" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.timeline.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.timeline.startDate ? (
                          format(formData.timeline.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.timeline.startDate || undefined}
                        onSelect={(date) => handleDateChange("startDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors["timeline.startDate"] && <p className="text-sm text-red-500">{errors["timeline.startDate"]}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label>End Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.timeline.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.timeline.endDate ? (
                          format(formData.timeline.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.timeline.endDate || undefined}
                        onSelect={(date) => handleDateChange("endDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeline.estimatedDuration">Estimated Duration</Label>
                  <Input
                    id="timeline.estimatedDuration"
                    name="timeline.estimatedDuration"
                    type="number"
                    value={formData.timeline.estimatedDuration}
                    onChange={handleTextChange}
                    placeholder="e.g., 3"
                    min="1"
                  />
                  {errors["timeline.estimatedDuration"] && (
                    <p className="text-sm text-red-500">{errors["timeline.estimatedDuration"]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline.durationType">Duration Type</Label>
                  <Select 
                    value={formData.timeline.durationType} 
                    onValueChange={(value) => handleSelectChange("timeline.durationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => handleSwitchChange("isRecurring", checked)}
                />
                <Label htmlFor="isRecurring" className="cursor-pointer">This is a recurring job</Label>
              </div>
              
              {formData.isRecurring && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="recurringFrequency">Recurring Frequency</Label>
                  <Select 
                    value={formData.recurringFrequency} 
                    onValueChange={(value) => handleSelectChange("recurringFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.recurringFrequency && <p className="text-sm text-red-500">{errors.recurringFrequency}</p>}
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-medium text-lg text-gray-900">Attachments (Optional)</h3>
          <p className="text-sm text-gray-600">
            Upload relevant files such as photos, blueprints, or documents to help professionals understand your job.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files or click to browse
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Max file size: 10MB | Supported formats: PDF, DOC, JPG, PNG
              </p>
              <Button variant="outline" size="sm" className="relative cursor-pointer" onClick={() => document.getElementById("file-upload")?.click()}>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                Browse Files
              </Button>
            </div>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Uploaded Files</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2 text-sm">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-700 truncate max-w-xs">{file.name}</span>
                      <span className="ml-2 text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                    <button 
                      type="button" 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeFile(index)}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => navigate("/client-dashboard/job-postings")}>
          Cancel
        </Button>
        <Button type="submit" className="btn-primary">
          Post Job
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
