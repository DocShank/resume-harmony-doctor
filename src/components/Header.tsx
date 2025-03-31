
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "react-tooltip";
import LogoAnimation from "./LogoAnimation";

type HeaderProps = {
  onDownloadPDF: () => void;
  isFormValid: boolean;
};

const Header = ({ onDownloadPDF, isFormValid }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 bg-doctor-dark shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <LogoAnimation simplified={true} />
        </div>
        
        <Button
          onClick={onDownloadPDF}
          data-tooltip-id="download-tooltip"
          data-tooltip-content={
            isFormValid
              ? "Download your resume as PDF"
              : "Please fill in all required fields to download"
          }
          className={`bg-doctor-blue hover:bg-blue-600 text-white ${
            !isFormValid && "opacity-70 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Tooltip id="download-tooltip" />
      </div>
    </header>
  );
};

export default Header;
