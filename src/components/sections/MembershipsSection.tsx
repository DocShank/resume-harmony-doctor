
import { Membership } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePickerField from "../DatePickerField";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MembershipsSectionProps = {
  data: Membership[];
  onChange: (data: Membership[]) => void;
};

const MembershipsSection = ({ data, onChange }: MembershipsSectionProps) => {
  const handleAddMembership = () => {
    const newMembership: Membership = {
      name: "",
      issueDate: null,
      expiryDate: null,
      remarks: "",
      id: Date.now().toString(),
    };
    onChange([...data, newMembership]);
  };

  const handleRemoveMembership = (id: string) => {
    onChange(data.filter((membership) => membership.id !== id));
  };

  const handleInputChange = (id: string, field: keyof Membership, value: any) => {
    onChange(
      data.map((membership) => (membership.id === id ? { ...membership, [field]: value } : membership))
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
        <h2 className="text-xl font-semibold">Professional Memberships & Certifications</h2>
        <Button 
          onClick={handleAddMembership} 
          size="sm"
          className="bg-doctor-accent hover:bg-doctor-accentDark"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Membership
        </Button>
      </div>
      
      <AnimatePresence>
        {data.length > 0 ? (
          data.map((membership, index) => (
            <motion.div
              key={membership.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Membership/Certification #{index + 1}</h3>
                <Button 
                  onClick={() => handleRemoveMembership(membership.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-3">
                  <Label htmlFor={`name-${membership.id}`}>Name <span className="text-destructive">*</span></Label>
                  <Input
                    id={`name-${membership.id}`}
                    value={membership.name}
                    onChange={(e) => handleInputChange(membership.id, "name", e.target.value)}
                    placeholder="Fellow of Royal College of Surgeons"
                    required
                  />
                </div>
                
                <DatePickerField
                  id={`issue-date-${membership.id}`}
                  label="Date of Issue"
                  value={membership.issueDate}
                  onChange={(date) => handleInputChange(membership.id, "issueDate", date)}
                  required
                />
                
                <DatePickerField
                  id={`expiry-date-${membership.id}`}
                  label="Expiry Date (if applicable)"
                  value={membership.expiryDate}
                  onChange={(date) => handleInputChange(membership.id, "expiryDate", date)}
                />
                
                <div>
                  <Label htmlFor={`remarks-${membership.id}`}>Remarks</Label>
                  <Textarea
                    id={`remarks-${membership.id}`}
                    value={membership.remarks}
                    onChange={(e) => handleInputChange(membership.id, "remarks", e.target.value)}
                    placeholder="Additional information about this membership or certification"
                    maxLength={300}
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
            No memberships or certifications added yet. Click the button above to add.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MembershipsSection;
