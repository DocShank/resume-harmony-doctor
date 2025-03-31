
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

type HobbiesSectionProps = {
  data: string;
  onChange: (data: string) => void;
};

const HobbiesSection = ({ data, onChange }: HobbiesSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 mb-8"
    >
      <h2 className="text-xl font-semibold">Hobbies & Interests</h2>
      
      <div>
        <Label htmlFor="hobbies">
          What are your interests outside of medicine? <span className="text-sm text-muted-foreground">(max 500 characters)</span>
        </Label>
        <Textarea
          id="hobbies"
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Reading medical journals, traveling, photography, playing guitar, volunteering at community health clinics, hiking, etc."
          className="min-h-24"
          maxLength={500}
        />
      </div>
    </motion.div>
  );
};

export default HobbiesSection;
