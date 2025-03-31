
import { useState } from "react";
import { Publication, SimplePublication } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePickerField from "../DatePickerField";
import { Plus, Trash2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { motion, AnimatePresence } from "framer-motion";

type PublicationsSectionProps = {
  detailedData: Publication[];
  simpleData: SimplePublication[];
  useSimple: boolean;
  onChange: (
    detailedData: Publication[],
    simpleData: SimplePublication[],
    useSimple: boolean
  ) => void;
};

const PublicationsSection = ({
  detailedData,
  simpleData,
  useSimple,
  onChange,
}: PublicationsSectionProps) => {
  const handleAddDetailedPublication = () => {
    const newPublication: Publication = {
      authors: "",
      title: "",
      journal: "",
      date: null,
      doi: "",
      id: Date.now().toString(),
    };
    onChange([...detailedData, newPublication], simpleData, false);
  };

  const handleRemoveDetailedPublication = (id: string) => {
    onChange(
      detailedData.filter((pub) => pub.id !== id),
      simpleData,
      useSimple
    );
  };

  const handleDetailedInputChange = (
    id: string,
    field: keyof Publication,
    value: any
  ) => {
    onChange(
      detailedData.map((pub) =>
        pub.id === id ? { ...pub, [field]: value } : pub
      ),
      simpleData,
      useSimple
    );
  };

  const handleAddSimplePublication = () => {
    const newPublication: SimplePublication = {
      text: "",
      id: Date.now().toString(),
    };
    onChange(detailedData, [...simpleData, newPublication], true);
  };

  const handleRemoveSimplePublication = (id: string) => {
    onChange(
      detailedData,
      simpleData.filter((pub) => pub.id !== id),
      useSimple
    );
  };

  const handleSimpleInputChange = (id: string, text: string) => {
    onChange(
      detailedData,
      simpleData.map((pub) => (pub.id === id ? { ...pub, text } : pub)),
      useSimple
    );
  };

  const handleTabChange = (value: string) => {
    onChange(detailedData, simpleData, value === "simple");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 mb-8"
    >
      <h2 className="text-xl font-semibold">Publications</h2>

      <Tabs
        defaultValue={useSimple ? "simple" : "detailed"}
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="simple">Simple Method</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Method</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div
              data-tooltip-id="simple-pub-tooltip"
              data-tooltip-content="Paste your publication in any standard format (e.g., APA, MLA)."
              className="text-sm text-muted-foreground italic"
            >
              Enter your publications in any standard format
            </div>
            <Tooltip id="simple-pub-tooltip" />
            <Button
              onClick={handleAddSimplePublication}
              size="sm"
              className="bg-doctor-accent hover:bg-doctor-accentDark"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Publication
            </Button>
          </div>

          <AnimatePresence>
            {simpleData.length > 0 ? (
              simpleData.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium">Publication #{index + 1}</h3>
                    <Button
                      onClick={() => handleRemoveSimplePublication(pub.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor={`simple-pub-${pub.id}`}>
                      Publication Text <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id={`simple-pub-${pub.id}`}
                      value={pub.text}
                      onChange={(e) => handleSimpleInputChange(pub.id, e.target.value)}
                      placeholder="Smith, J., Jones, A., et al. (2023). Title of publication. Journal Name, Volume(Issue), pp-pp. DOI: xxx"
                      className="h-32"
                      maxLength={2000}
                      required
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 italic"
              >
                No publications added yet. Click the button above to add your publications.
              </motion.p>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="detailed" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div
              data-tooltip-id="detailed-pub-tooltip"
              data-tooltip-content="Enter details for precise formatting in the resume."
              className="text-sm text-muted-foreground italic"
            >
              Enter detailed information for each publication
            </div>
            <Tooltip id="detailed-pub-tooltip" />
            <Button
              onClick={handleAddDetailedPublication}
              size="sm"
              className="bg-doctor-accent hover:bg-doctor-accentDark"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Detailed Publication
            </Button>
          </div>

          <AnimatePresence>
            {detailedData.length > 0 ? (
              detailedData.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  className="border border-doctor-accentDark/50 rounded-md p-4 mb-4"
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium">Publication #{index + 1}</h3>
                    <Button
                      onClick={() => handleRemoveDetailedPublication(pub.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`authors-${pub.id}`}>
                        Authors <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`authors-${pub.id}`}
                        value={pub.authors}
                        onChange={(e) =>
                          handleDetailedInputChange(pub.id, "authors", e.target.value)
                        }
                        placeholder="Smith J, Jones A, et al"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`title-${pub.id}`}>
                        Title <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`title-${pub.id}`}
                        value={pub.title}
                        onChange={(e) =>
                          handleDetailedInputChange(pub.id, "title", e.target.value)
                        }
                        placeholder="Advances in Medical Research"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`journal-${pub.id}`}>
                        Journal/Conference <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`journal-${pub.id}`}
                        value={pub.journal}
                        onChange={(e) =>
                          handleDetailedInputChange(pub.id, "journal", e.target.value)
                        }
                        placeholder="Journal of Medical Sciences"
                        required
                      />
                    </div>

                    <DatePickerField
                      id={`pub-date-${pub.id}`}
                      label="Publication Date"
                      value={pub.date}
                      onChange={(date) =>
                        handleDetailedInputChange(pub.id, "date", date)
                      }
                      required
                    />

                    <div>
                      <Label htmlFor={`doi-${pub.id}`}>DOI</Label>
                      <Input
                        id={`doi-${pub.id}`}
                        value={pub.doi}
                        onChange={(e) =>
                          handleDetailedInputChange(pub.id, "doi", e.target.value)
                        }
                        placeholder="10.1000/xyz123"
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
                No detailed publications added yet. Click the button above to add your publications.
              </motion.p>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PublicationsSection;
