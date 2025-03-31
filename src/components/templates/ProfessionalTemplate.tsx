
import { ResumeData } from "@/types/resume";
import { format } from "date-fns";

type ProfessionalTemplateProps = {
  data: ResumeData;
};

const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  const {
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
  } = data;

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "MMM yyyy");
  };

  return (
    <div className="resume-professional p-8 text-left">
      <div className="flex flex-col items-start mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {personalDetails.firstName} {personalDetails.middleName} {personalDetails.lastName}
        </h1>
        {personalDetails.organization && (
          <p className="text-lg mb-3">{personalDetails.organization}</p>
        )}
        <div className="text-sm">
          <p>{personalDetails.address}</p>
          <p>{personalDetails.phone} | {personalDetails.email}</p>
          <p>
            {personalDetails.idType}: {personalDetails.idNumber}
            {personalDetails.isAccredited && personalDetails.accreditedOrg && (
              ` | ${personalDetails.accreditedOrg}: ${personalDetails.accreditedId}`
            )}
          </p>
        </div>
      </div>

      {medicalEducation.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2">EDUCATION</h2>
          <ul className="list-none pl-0 space-y-3">
            {medicalEducation.map((edu) => (
              <li key={edu.id} className="mb-1">
                <div className="flex justify-between">
                  <strong>{edu.degree}</strong>
                  <span>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </span>
                </div>
                <div>{edu.institution}</div>
                {edu.score && <div>Score: {edu.score}</div>}
                {edu.remarks && <div className="text-sm italic">{edu.remarks}</div>}
              </li>
            ))}
            
            {additionalEducation.map((edu) => (
              <li key={edu.id} className="mb-1">
                <div className="flex justify-between">
                  <strong>{edu.degree}</strong>
                  <span>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </span>
                </div>
                <div>{edu.institution}</div>
                {edu.score && <div>Score: {edu.score}</div>}
                {edu.remarks && <div className="text-sm italic">{edu.remarks}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2">EXPERIENCE</h2>
          <ul className="list-none pl-0 space-y-3">
            {experiences.map((exp) => (
              <li key={exp.id} className="mb-1">
                <div className="flex justify-between">
                  <strong>{exp.role}, {exp.department}</strong>
                  <span>
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>
                <div>{exp.organization} ({exp.type})</div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {((useSimplePublications && simplePublications.length > 0) || 
        (!useSimplePublications && detailedPublications.length > 0)) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2">PUBLICATIONS</h2>
          <ul className="list-none pl-0 space-y-2">
            {useSimplePublications ? (
              simplePublications.map((pub) => (
                <li key={pub.id} className="mb-1">
                  {pub.text}
                </li>
              ))
            ) : (
              detailedPublications.map((pub) => (
                <li key={pub.id} className="mb-1">
                  {pub.authors}. ({pub.date ? format(pub.date, "yyyy") : "n.d."}). 
                  <em> {pub.title}</em>. {pub.journal}. 
                  {pub.doi && <span> DOI: {pub.doi}</span>}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2">HONORS & AWARDS</h2>
          <ul className="list-none pl-0 space-y-2">
            {awards.map((award) => (
              <li key={award.id} className="mb-1">
                <div className="flex justify-between">
                  <strong>{award.title}</strong>
                  {award.date && <span>{format(award.date, "yyyy")}</span>}
                </div>
                <div>{award.organization}</div>
                {award.description && <p className="text-sm italic">{award.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {memberships.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2">PROFESSIONAL MEMBERSHIPS</h2>
          <ul className="list-none pl-0 space-y-2">
            {memberships.map((membership) => (
              <li key={membership.id} className="mb-1">
                <div className="flex justify-between">
                  <strong>{membership.name}</strong>
                  <span>
                    {formatDate(membership.issueDate)}
                    {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
                  </span>
                </div>
                {membership.remarks && <p className="text-sm italic">{membership.remarks}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap justify-between">
        {languages.length > 0 && (
          <div className="w-full md:w-1/2 mb-6 pr-4">
            <h2 className="text-lg font-bold border-b border-gray-400 mb-2">LANGUAGES</h2>
            <ul className="list-none pl-0">
              {languages.map((lang) => (
                <li key={lang.id} className="mb-1">
                  <strong>{lang.language}:</strong> {lang.proficiency}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hobbies && (
          <div className="w-full md:w-1/2 mb-6">
            <h2 className="text-lg font-bold border-b border-gray-400 mb-2">INTERESTS</h2>
            <p>{hobbies}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
