
import { Button } from "@/components/ui/button";
import LogoAnimation from "./LogoAnimation";
import { motion } from "framer-motion";

type HeaderProps = {
  onDownloadPDF: () => void;
  isFormValid: boolean;
};

const Header = ({ onDownloadPDF, isFormValid }: HeaderProps) => {
  return (
    <header className="w-full px-6 py-4 bg-doctor-dark border-b border-doctor-accentDark flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <LogoAnimation />
      </div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onDownloadPDF}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-doctor-accent to-doctor-accentDark hover:from-doctor-accentDark hover:to-doctor-accent text-doctor-light font-medium px-6 py-2 rounded-md"
        >
          Download PDF
        </Button>
      </motion.div>
    </header>
  );
};

export default Header;
