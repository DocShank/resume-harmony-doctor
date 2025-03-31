
export type TemplateType = 'professional' | 'modern' | 'executive';

export type Language = {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
  id: string;
};

export type Education = {
  institution: string;
  degree: string;
  startDate: Date | null;
  endDate: Date | null;
  graduationYear: Date | null;
  score: string;
  remarks: string;
  id: string;
};

export type Award = {
  title: string;
  organization: string;
  date: Date | null;
  description: string;
  id: string;
};

export type Experience = {
  role: string;
  department: string;
  organization: string;
  startDate: Date | null;
  endDate: Date | null;
  type: string;
  description: string;
  id: string;
};

export type Publication = {
  authors: string;
  title: string;
  journal: string;
  date: Date | null;
  doi: string;
  id: string;
};

export type SimplePublication = {
  text: string;
  id: string;
};

export type Membership = {
  name: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  remarks: string;
  id: string;
};

export type PersonalDetails = {
  photo: string | null;
  firstName: string;
  middleName: string;
  lastName: string;
  organization: string;
  idType: string;
  idNumber: string;
  isAccredited: boolean;
  accreditedOrg: string;
  accreditedId: string;
  address: string;
  phone: string;
  email: string;
};

export type ResumeData = {
  personalDetails: PersonalDetails;
  medicalEducation: Education[];
  additionalEducation: Education[];
  awards: Award[];
  experiences: Experience[];
  detailedPublications: Publication[];
  simplePublications: SimplePublication[];
  useSimplePublications: boolean;
  memberships: Membership[];
  hobbies: string;
  languages: Language[];
  selectedTemplate: TemplateType;
};
