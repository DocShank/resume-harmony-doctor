
import { ResumeData } from "@/types/resume";
import { format } from "date-fns";

type ExecutiveTemplateProps = {
  data: ResumeData;
};

const ExecutiveTemplate = ({ data }: ExecutiveTemplateProps) => {
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
    <div className="resume-executive p-8 text-left">
      <div className="text-center mb-8">
        {personalDetails.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={personalDetails.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-amber-400"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {personalDetails.firstName} {personalDetails.middleName} {personalDetails.lastName}
        </h1>
        {personalDetails.organization && (
          <p className="text-xl mt-1">{personalDetails.organization}</p>
        )}
        <div className="mt-2 text-sm">
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

      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">PROFESSIONAL EXPERIENCE</h2>
          <ul className="list-none pl-0 space-y-5">
            {experiences.map((exp) => (
              <li key={exp.id}>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <span className="text-amber-700 font-semibold">
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="italic">{exp.organization}, {exp.department}</p>
                  <p className="text-sm">{exp.type}</p>
                </div>
                {exp.description && <p className="text-justify">{exp.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {medicalEducation.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">EDUCATION</h2>
          <ul className="list-none pl-0 space-y-4">
            {medicalEducation.map((edu) => (
              <li key={edu.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <span className="text-amber-700 font-semibold">
                    {edu.graduationYear ? format(edu.graduationYear, "yyyy") : ""}
                  </span>
                </div>
                <p className="italic">{edu.institution}</p>
                <div className="flex justify-between text-sm">
                  <span>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</span>
                  {edu.score && <span>Score: {edu.score}</span>}
                </div>
                {edu.remarks && <p className="text-sm mt-1">{edu.remarks}</p>}
              </li>
            ))}
            
            {additionalEducation.map((edu) => (
              <li key={edu.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <span className="text-amber-700 font-semibold">
                    {edu.graduationYear ? format(edu.graduationYear, "yyyy") : ""}
                  </span>
                </div>
                <p className="italic">{edu.institution}</p>
                <div className="flex justify-between text-sm">
                  <span>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</span>
                  {edu.score && <span>Score: {edu.score}</span>}
                </div>
                {edu.remarks && <p className="text-sm mt-1">{edu.remarks}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {awards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">HONORS & DISTINCTIONS</h2>
          <ul className="list-none pl-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award) => (
              <li key={award.id} className="mb-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{award.title}</h3>
                  {award.date && <span className="text-amber-700">{format(award.date, "yyyy")}</span>}
                </div>
                <p className="italic text-sm">{award.organization}</p>
                {award.description && <p className="text-sm">{award.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {((useSimplePublications && simplePublications.length > 0) || 
        (!useSimplePublications && detailedPublications.length > 0)) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">PUBLICATIONS</h2>
          <ul className="list-none pl-0 space-y-3">
            {useSimplePublications ? (
              simplePublications.map((pub) => (
                <li key={pub.id} className="mb-1 text-justify">
                  {pub.text}
                </li>
              ))
            ) : (
              detailedPublications.map((pub) => (
                <li key={pub.id} className="mb-1 text-justify">
                  {pub.authors}. ({pub.date ? format(pub.date, "yyyy") : "n.d."}). 
                  <em> {pub.title}</em>. {pub.journal}. 
                  {pub.doi && <span> DOI: {pub.doi}</span>}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {memberships.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">PROFESSIONAL MEMBERSHIPS</h2>
            <ul className="list-none pl-0 space-y-3">
              {memberships.map((membership) => (
                <li key={membership.id}>
                  <p className="font-semibold">{membership.name}</p>
                  <p className="text-sm text-amber-700">
                    {formatDate(membership.issueDate)}
                    {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
                  </p>
                  {membership.remarks && <p className="text-sm mt-1">{membership.remarks}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">LANGUAGES</h2>
              <ul className="list-none pl-0 grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <li key={lang.id}>
                    <span className="font-semibold">{lang.language}</span>: {lang.proficiency}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hobbies && (
            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wide section-title pb-1 mb-4">INTERESTS</h2>
              <p className="text-justify">{hobbies}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
