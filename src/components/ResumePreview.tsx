
import { ResumeData } from "@/types/resume";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

type ResumePreviewProps = {
  data: ResumeData;
  pdfRef: React.RefObject<HTMLDivElement>;
};

const ResumePreview = ({ data, pdfRef }: ResumePreviewProps) => {
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      default:
        return <ProfessionalTemplate data={data} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden" ref={pdfRef}>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
