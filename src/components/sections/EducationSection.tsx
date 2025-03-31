
import { useState } from "react";
import { Education } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePickerField from "../DatePickerField";
import { Plus, Trash2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { motion, AnimatePresence } from "framer-motion";

type EducationSectionProps = {
  title: string;
  data: Education[];
  onChange: (data: Education[]) => void;
  isMedical?: boolean;
};

const EducationSection = ({ title, data, onChange, isMedical = false }: EducationSectionProps) => {
  const handleAddEducation = () => {
    const newEducation: Education = {
      institution: "",
      degree: "",
      startDate: null,
      endDate: null,
      graduationYear: null,
      score: "",
      remarks: "",
      id: Date.now().toString(),
    };
    onChange([...data, newEducation]);
  };

  const handleRemoveEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const handleInputChange = (id: string, field: keyof Education, value: any) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
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
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button 
          onClick={handleAddEducation} 
          size="sm"
          className="bg-doctor-accent hover:bg-doctor-accentDark"
        >
          <Plus className="h-4 w-4 mr-1" /> Add {isMedical ? "Medical" : "Other"} Education
        </Button>
      </div>
      
      <AnimatePresence>
        {data.length > 0 ? (
          data.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Education #{index + 1}</h3>
                <Button 
                  onClick={() => handleRemoveEducation(edu.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`institution-${edu.id}`}>Institution Name <span className="text-destructive">*</span></Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => handleInputChange(edu.id, "institution", e.target.value)}
                    placeholder="Harvard Medical School"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center">
                    <Label 
                      htmlFor={`degree-${edu.id}`}
                      data-tooltip-id={`degree-tooltip-${edu.id}`}
                      data-tooltip-content="Choose your medical qualification (e.g., MBBS)."
                    >
                      Degree <span className="text-destructive">*</span>
                    </Label>
                    {isMedical && <Tooltip id={`degree-tooltip-${edu.id}`} />}
                  </div>
                  
                  <Select 
                    value={edu.degree} 
                    onValueChange={(value) => handleInputChange(edu.id, "degree", value)}
                  >
                    <SelectTrigger id={`degree-${edu.id}`}>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {isMedical ? (
                        <>
                          <SelectItem value="MBBS">MBBS</SelectItem>
                          <SelectItem value="MD">MD</SelectItem>
                          <SelectItem value="MS">MS</SelectItem>
                          <SelectItem value="DO">DO</SelectItem>
                          <SelectItem value="Ph.D">Ph.D in Medical Sciences</SelectItem>
                          <SelectItem value="DM">DM</SelectItem>
                          <SelectItem value="MCh">MCh</SelectItem>
                          <SelectItem value="DNB">DNB</SelectItem>
                          <SelectItem value="MRCP">MRCP</SelectItem>
                          <SelectItem value="MRCS">MRCS</SelectItem>
                          <SelectItem value="FRCS">FRCS</SelectItem>
                          <SelectItem value="FRCP">FRCP</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="BS">BS / B.Sc</SelectItem>
                          <SelectItem value="BA">BA</SelectItem>
                          <SelectItem value="BBA">BBA</SelectItem>
                          <SelectItem value="MBA">MBA</SelectItem>
                          <SelectItem value="MS">MS / M.Sc</SelectItem>
                          <SelectItem value="MA">MA</SelectItem>
                          <SelectItem value="Ph.D">Ph.D</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Certificate">Certificate</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <DatePickerField
                  id={`startDate-${edu.id}`}
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(date) => handleInputChange(edu.id, "startDate", date)}
                  required
                />
                
                <DatePickerField
                  id={`endDate-${edu.id}`}
                  label="End Date"
                  value={edu.endDate}
                  onChange={(date) => handleInputChange(edu.id, "endDate", date)}
                />
                
                <DatePickerField
                  id={`graduationYear-${edu.id}`}
                  label="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(date) => handleInputChange(edu.id, "graduationYear", date)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`score-${edu.id}`}>Score/Percentage</Label>
                  <Input
                    id={`score-${edu.id}`}
                    value={edu.score}
                    onChange={(e) => handleInputChange(edu.id, "score", e.target.value)}
                    placeholder="85%"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`remarks-${edu.id}`}>Remarks</Label>
                  <Textarea
                    id={`remarks-${edu.id}`}
                    value={edu.remarks}
                    onChange={(e) => handleInputChange(edu.id, "remarks", e.target.value)}
                    placeholder="Additional information about your education"
                    maxLength={500}
                  />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 italic"
          >
            No {isMedical ? "medical" : "additional"} education added yet. Click the button above to add.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EducationSection;
