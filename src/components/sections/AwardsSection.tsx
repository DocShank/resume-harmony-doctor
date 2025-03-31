
import { Award } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePickerField from "../DatePickerField";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AwardsSectionProps = {
  data: Award[];
  onChange: (data: Award[]) => void;
};

const AwardsSection = ({ data, onChange }: AwardsSectionProps) => {
  const handleAddAward = () => {
    const newAward: Award = {
      title: "",
      organization: "",
      date: null,
      description: "",
      id: Date.now().toString(),
    };
    onChange([...data, newAward]);
  };

  const handleRemoveAward = (id: string) => {
    onChange(data.filter((award) => award.id !== id));
  };

  const handleInputChange = (id: string, field: keyof Award, value: any) => {
    onChange(
      data.map((award) => (award.id === id ? { ...award, [field]: value } : award))
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
        <h2 className="text-xl font-semibold">Honors & Awards</h2>
        <Button 
          onClick={handleAddAward} 
          size="sm"
          className="bg-doctor-accent hover:bg-doctor-accentDark"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Award
        </Button>
      </div>
      
      <AnimatePresence>
        {data.length > 0 ? (
          data.map((award, index) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Award #{index + 1}</h3>
                <Button 
                  onClick={() => handleRemoveAward(award.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`award-title-${award.id}`}>Award Title <span className="text-destructive">*</span></Label>
                  <Input
                    id={`award-title-${award.id}`}
                    value={award.title}
                    onChange={(e) => handleInputChange(award.id, "title", e.target.value)}
                    placeholder="Excellence in Medical Research"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`award-org-${award.id}`}>Issuing Organization <span className="text-destructive">*</span></Label>
                  <Input
                    id={`award-org-${award.id}`}
                    value={award.organization}
                    onChange={(e) => handleInputChange(award.id, "organization", e.target.value)}
                    placeholder="American Medical Association"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePickerField
                  id={`award-date-${award.id}`}
                  label="Award Date"
                  value={award.date}
                  onChange={(date) => handleInputChange(award.id, "date", date)}
                  required
                />
                
                <div>
                  <Label htmlFor={`award-desc-${award.id}`}>Description</Label>
                  <Textarea
                    id={`award-desc-${award.id}`}
                    value={award.description}
                    onChange={(e) => handleInputChange(award.id, "description", e.target.value)}
                    placeholder="Brief description of the award and its significance"
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
            No awards added yet. Click the button above to add your honors and awards.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AwardsSection;
