
import { useState, useRef, useMemo } from "react";
import { 
  ResumeData, 
  PersonalDetails, 
  Education, 
  Award, 
  Experience, 
  Publication, 
  SimplePublication, 
  Membership, 
  Language,
  TemplateType 
} from "@/types/resume";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip } from "react-tooltip";
import { toast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";

// Import components
import Header from "@/components/Header";
import PersonalDetailsSection from "@/components/sections/PersonalDetailsSection";
import EducationSection from "@/components/sections/EducationSection";
import AwardsSection from "@/components/sections/AwardsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import MembershipsSection from "@/components/sections/MembershipsSection";
import HobbiesSection from "@/components/sections/HobbiesSection";
import LanguagesSection from "@/components/sections/LanguagesSection";
import TemplateSelector from "@/components/TemplateSelector";
import ResumePreview from "@/components/ResumePreview";

const Index = () => {
  // Initial empty state
  const initialPersonalDetails: PersonalDetails = {
    photo: null,
    firstName: "",
    middleName: "",
    lastName: "",
    organization: "",
    idType: "",
    idNumber: "",
    isAccredited: false,
    accreditedOrg: "",
    accreditedId: "",
    address: "",
    phone: "",
    email: "",
  };

  // State for form data
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(initialPersonalDetails);
  const [medicalEducation, setMedicalEducation] = useState<Education[]>([]);
  const [additionalEducation, setAdditionalEducation] = useState<Education[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [detailedPublications, setDetailedPublications] = useState<Publication[]>([]);
  const [simplePublications, setSimplePublications] = useState<SimplePublication[]>([]);
  const [useSimplePublications, setUseSimplePublications] = useState(true);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [hobbies, setHobbies] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("professional");
  
  // State for current tab
  const [activeTab, setActiveTab] = useState("personal");
  
  // Ref for PDF generation
  const resumeRef = useRef<HTMLDivElement>(null);

  // Combined resume data for preview
  const resumeData: ResumeData = useMemo(() => ({
    personalDetails,
    medicalEducation,
    additionalEducation,
    awards,
    experiences,
    detailedPublications,
    simplePublications,
    useSimplePublications,
    memberships,
    hobbies,
    languages,
    selectedTemplate,
  }), [
    personalDetails,
    medicalEducation,
    additionalEducation,
    awards,
    experiences,
    detailedPublications,
    simplePublications,
    useSimplePublications,
    memberships,
    hobbies,
    languages,
    selectedTemplate,
  ]);

  // Check if form is valid for PDF generation
  const isFormValid = useMemo(() => {
    // Basic required fields validation
    if (!personalDetails.firstName || !personalDetails.lastName || !personalDetails.idType || 
        !personalDetails.idNumber || !personalDetails.address || !personalDetails.phone || !personalDetails.email) {
      return false;
    }
    
    // At least one education entry is required
    if (medicalEducation.length === 0) {
      return false;
    }
    
    // Check if each medical education has required fields
    for (const edu of medicalEducation) {
      if (!edu.institution || !edu.degree || !edu.startDate || !edu.graduationYear) {
        return false;
      }
    }
    
    // Further validation can be added for other sections
    
    return true;
  }, [personalDetails, medicalEducation]);

  // Handle publications updates
  const handlePublicationsChange = (
    detailed: Publication[],
    simple: SimplePublication[],
    useSimple: boolean
  ) => {
    setDetailedPublications(detailed);
    setSimplePublications(simple);
    setUseSimplePublications(useSimple);
  };

  // Function to handle PDF generation
  const handleDownloadPDF = () => {
    if (!isFormValid) {
      toast({
        variant: "destructive",
        title: "Missing required information",
        description: "Please fill in all required fields before generating your PDF."
      });
      return;
    }

    if (resumeRef.current) {
      const element = resumeRef.current;
      
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${personalDetails.firstName}_${personalDetails.lastName}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };
      
      toast({
        title: "Generating PDF",
        description: "Your resume is being prepared for download."
      });
      
      // Generate PDF
      html2pdf().set(opt).from(element).save().then(() => {
        toast({
          title: "PDF Generated",
          description: "Your resume has been downloaded successfully."
        });
      }).catch((error: any) => {
        console.error("PDF generation error:", error);
        toast({
          variant: "destructive",
          title: "PDF Generation Failed",
          description: "There was an error generating your PDF. Please try again."
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-doctor-dark">
      <Header onDownloadPDF={handleDownloadPDF} isFormValid={isFormValid} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-doctor-accentDark/20 rounded-lg p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
                <TabsTrigger value="awards">Awards</TabsTrigger>
                <TabsTrigger value="memberships">Memberships</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="template">Template</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                <TabsContent value="personal">
                  <PersonalDetailsSection 
                    data={personalDetails} 
                    onChange={setPersonalDetails} 
                  />
                </TabsContent>
                
                <TabsContent value="education">
                  <EducationSection 
                    title="Medical Education" 
                    data={medicalEducation} 
                    onChange={setMedicalEducation} 
                    isMedical={true}
                  />
                  
                  <EducationSection 
                    title="Additional Education" 
                    data={additionalEducation} 
                    onChange={setAdditionalEducation} 
                  />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ExperienceSection 
                    data={experiences} 
                    onChange={setExperiences} 
                  />
                </TabsContent>
                
                <TabsContent value="publications">
                  <PublicationsSection 
                    detailedData={detailedPublications}
                    simpleData={simplePublications}
                    useSimple={useSimplePublications}
                    onChange={handlePublicationsChange}
                  />
                </TabsContent>
                
                <TabsContent value="awards">
                  <AwardsSection 
                    data={awards} 
                    onChange={setAwards} 
                  />
                </TabsContent>
                
                <TabsContent value="memberships">
                  <MembershipsSection 
                    data={memberships} 
                    onChange={setMemberships} 
                  />
                </TabsContent>
                
                <TabsContent value="languages">
                  <LanguagesSection 
                    data={languages} 
                    onChange={setLanguages} 
                  />
                  
                  <HobbiesSection 
                    data={hobbies} 
                    onChange={setHobbies} 
                  />
                </TabsContent>
                
                <TabsContent value="template">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate} 
                    onTemplateChange={setSelectedTemplate} 
                  />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
          
          {/* Preview Section */}
          <motion.div 
            className="sticky top-32 h-[calc(100vh-180px)] overflow-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResumePreview data={resumeData} pdfRef={resumeRef} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
