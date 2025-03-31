
import { Language } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type LanguagesSectionProps = {
  data: Language[];
  onChange: (data: Language[]) => void;
};

const LanguagesSection = ({ data, onChange }: LanguagesSectionProps) => {
  const handleAddLanguage = () => {
    const newLanguage: Language = {
      language: "",
      proficiency: "Intermediate",
      id: Date.now().toString(),
    };
    onChange([...data, newLanguage]);
  };

  const handleRemoveLanguage = (id: string) => {
    onChange(data.filter((lang) => lang.id !== id));
  };

  const handleInputChange = (id: string, field: keyof Language, value: any) => {
    onChange(
      data.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
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
        <h2 className="text-xl font-semibold">Language Proficiency</h2>
        <Button 
          onClick={handleAddLanguage} 
          size="sm"
          className="bg-doctor-accent hover:bg-doctor-accentDark"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Language
        </Button>
      </div>
      
      <AnimatePresence>
        {data.length > 0 ? (
          data.map((lang, index) => (
            <motion.div
              key={lang.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Language #{index + 1}</h3>
                <Button 
                  onClick={() => handleRemoveLanguage(lang.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`language-${lang.id}`}>Language <span className="text-destructive">*</span></Label>
                  <Input
                    id={`language-${lang.id}`}
                    value={lang.language}
                    onChange={(e) => handleInputChange(lang.id, "language", e.target.value)}
                    placeholder="English"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`proficiency-${lang.id}`}>Proficiency Level <span className="text-destructive">*</span></Label>
                  <Select 
                    value={lang.proficiency} 
                    onValueChange={(value) => handleInputChange(lang.id, "proficiency", value)}
                  >
                    <SelectTrigger id={`proficiency-${lang.id}`}>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Native">Native</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
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
            No languages added yet. Click the button above to add languages you speak.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LanguagesSection;
