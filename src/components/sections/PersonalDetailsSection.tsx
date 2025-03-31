
import { useState } from "react";
import { PersonalDetails } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";

type PersonalDetailsSectionProps = {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
};

const PersonalDetailsSection = ({ data, onChange }: PersonalDetailsSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onChange({ ...data, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange({ ...data, isAccredited: checked });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          onChange({ ...data, photo: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="flex flex-col items-center">
            <div 
              className="w-32 h-32 rounded-full border-2 border-doctor-accentDark overflow-hidden mb-2 flex items-center justify-center bg-doctor-accentDark/30"
              data-tooltip-id="photo-tooltip"
              data-tooltip-content="Upload a professional headshot (min 300x300px recommended)."
            >
              {data.photo ? (
                <img 
                  src={data.photo} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-4xl">📷</span>
              )}
            </div>
            <Tooltip id="photo-tooltip" />
            
            <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-doctor-accent hover:bg-doctor-accentDark text-white rounded-md text-sm transition-colors">
              Upload Photo
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </label>
          </div>
        </div>
        
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
            <Input
              id="firstName"
              name="firstName"
              value={data.firstName}
              onChange={handleInputChange}
              placeholder="John"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              name="middleName"
              value={data.middleName}
              onChange={handleInputChange}
              placeholder="William"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
            <Input
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={handleInputChange}
              placeholder="Smith"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="organization">Organization/Hospital</Label>
            <Input
              id="organization"
              name="organization"
              value={data.organization}
              onChange={handleInputChange}
              placeholder="Apollo Hospital"
            />
          </div>
          
          <div>
            <Label 
              htmlFor="idType"
              data-tooltip-id="id-type-tooltip"
              data-tooltip-content="Select your medical council or licensing body (e.g., NMC)."
            >
              ID Type <span className="text-destructive">*</span>
            </Label>
            <Tooltip id="id-type-tooltip" />
            <Select 
              value={data.idType} 
              onValueChange={(value) => handleSelectChange("idType", value)}
            >
              <SelectTrigger id="idType">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NMC">NMC (Nepal Medical Council)</SelectItem>
                <SelectItem value="GMC">GMC (General Medical Council)</SelectItem>
                <SelectItem value="IMC">IMC (Indian Medical Council)</SelectItem>
                <SelectItem value="PMDC">PMDC (Pakistan Medical & Dental Council)</SelectItem>
                <SelectItem value="BMDC">BMDC (Bangladesh Medical & Dental Council)</SelectItem>
                <SelectItem value="SLMC">SLMC (Sri Lanka Medical Council)</SelectItem>
                <SelectItem value="AMC">AMC (Australian Medical Council)</SelectItem>
                <SelectItem value="USMLE">USMLE (United States Medical Licensing Examination)</SelectItem>
                <SelectItem value="RLMC">Royal License</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="idNumber">ID Number <span className="text-destructive">*</span></Label>
            <Input
              id="idNumber"
              name="idNumber"
              value={data.idNumber}
              onChange={handleInputChange}
              placeholder="12345-MD"
              maxLength={20}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="isAccredited" 
            checked={data.isAccredited}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="isAccredited">Accredited ID</Label>
        </div>
        
        {data.isAccredited && (
          <>
            <div>
              <Label htmlFor="accreditedOrg">Accredited Organization</Label>
              <Input
                id="accreditedOrg"
                name="accreditedOrg"
                value={data.accreditedOrg}
                onChange={handleInputChange}
                placeholder="Royal College of Physicians"
              />
            </div>
            
            <div>
              <Label htmlFor="accreditedId">Accredited ID Number</Label>
              <Input
                id="accreditedId"
                name="accreditedId"
                value={data.accreditedId}
                onChange={handleInputChange}
                placeholder="RC-12345"
              />
            </div>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <Label htmlFor="address">Mailing Address <span className="text-destructive">*</span></Label>
          <Textarea
            id="address"
            name="address"
            value={data.address}
            onChange={handleInputChange}
            placeholder="123 Medical Dr., New York, NY 10001"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleInputChange}
            placeholder="doctor@example.com"
            required
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalDetailsSection;
