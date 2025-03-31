
import { TemplateType } from "@/types/resume";
import { motion } from "framer-motion";

type TemplateSelectorProps = {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
};

const TemplateSelector = ({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) => {
  const templates: { id: TemplateType; name: string; description: string }[] = [
    {
      id: "professional",
      name: "Professional",
      description: "Classic single-column layout with Times New Roman font",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Two-column layout with Arial font and blue accents",
    },
    {
      id: "executive",
      name: "Executive",
      description: "Elegant single-column layout with Garamond font and gold accents",
    },
  ];

  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-semibold mb-4">Select Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-300 ${
              selectedTemplate === template.id
                ? "border-doctor-blue bg-doctor-accentDark/30"
                : "border-doctor-accentDark/50 hover:border-doctor-accentDark"
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <h3 className="font-bold text-lg mb-1">{template.name}</h3>
            <p className="text-sm text-gray-300">{template.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
