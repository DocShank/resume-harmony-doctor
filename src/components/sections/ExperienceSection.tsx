
import { Experience } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePickerField from "../DatePickerField";
import { Plus, Trash2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { motion, AnimatePresence } from "framer-motion";

type ExperienceSectionProps = {
  data: Experience[];
  onChange: (data: Experience[]) => void;
};

const ExperienceSection = ({ data, onChange }: ExperienceSectionProps) => {
  const handleAddExperience = () => {
    const newExperience: Experience = {
      role: "",
      department: "",
      organization: "",
      startDate: null,
      endDate: null,
      type: "",
      description: "",
      id: Date.now().toString(),
    };
    onChange([...data, newExperience]);
  };

  const handleRemoveExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const handleInputChange = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 mb-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Experience</h2>
        <Button 
          onClick={handleAddExperience} 
          size="sm"
          className="bg-doctor-accent hover:bg-doctor-accentDark"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Experience
        </Button>
      </div>
      
      <AnimatePresence>
        {data.length > 0 ? (
          data.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                <Button 
                  onClick={() => handleRemoveExperience(exp.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center">
                    <Label 
                      htmlFor={`role-${exp.id}`}
                      data-tooltip-id={`role-tooltip-${exp.id}`}
                      data-tooltip-content="Enter your job title (e.g., Resident Doctor)."
                    >
                      Role/Designation <span className="text-destructive">*</span>
                    </Label>
                    <Tooltip id={`role-tooltip-${exp.id}`} />
                  </div>
                  <Input
                    id={`role-${exp.id}`}
                    value={exp.role}
                    onChange={(e) => handleInputChange(exp.id, "role", e.target.value)}
                    placeholder="Consultant Surgeon"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`department-${exp.id}`}>Department/Specialty <span className="text-destructive">*</span></Label>
                  <Input
                    id={`department-${exp.id}`}
                    value={exp.department}
                    onChange={(e) => handleInputChange(exp.id, "department", e.target.value)}
                    placeholder="Cardiology"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`organization-${exp.id}`}>Institution/Organization <span className="text-destructive">*</span></Label>
                  <Input
                    id={`organization-${exp.id}`}
                    value={exp.organization}
                    onChange={(e) => handleInputChange(exp.id, "organization", e.target.value)}
                    placeholder="Mayo Clinic"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <DatePickerField
                  id={`start-date-${exp.id}`}
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(date) => handleInputChange(exp.id, "startDate", date)}
                  required
                />
                
                <DatePickerField
                  id={`end-date-${exp.id}`}
                  label="End Date (leave empty for current role)"
                  value={exp.endDate}
                  onChange={(date) => handleInputChange(exp.id, "endDate", date)}
                />
                
                <div>
                  <Label htmlFor={`type-${exp.id}`}>Type <span className="text-destructive">*</span></Label>
                  <Select 
                    value={exp.type} 
                    onValueChange={(value) => handleInputChange(exp.id, "type", value)}
                  >
                    <SelectTrigger id={`type-${exp.id}`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Fellowship">Fellowship</SelectItem>
                      <SelectItem value="Residency">Residency</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Locum">Locum</SelectItem>
                      <SelectItem value="Volunteer">Volunteer</SelectItem>
                      <SelectItem value="Consultant">Consultant</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  value={exp.description}
                  onChange={(e) => handleInputChange(exp.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities, achievements, and any notable cases or projects"
                  maxLength={800}
                  className="h-24"
                />
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 italic"
          >
            No experience added yet. Click the button above to add your professional experience.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExperienceSection;
