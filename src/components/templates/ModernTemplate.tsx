
import { ResumeData } from "@/types/resume";
import { format } from "date-fns";

type ModernTemplateProps = {
  data: ResumeData;
};

const ModernTemplate = ({ data }: ModernTemplateProps) => {
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
    <div className="resume-modern text-left">
      <div className="bg-blue-700 text-white p-8">
        <div className="flex items-center">
          {personalDetails.photo && (
            <div className="mr-6">
              <img
                src={personalDetails.photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">
              {personalDetails.firstName} {personalDetails.middleName} {personalDetails.lastName}
            </h1>
            {personalDetails.organization && (
              <p className="text-xl mt-1 text-blue-100">{personalDetails.organization}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-100 p-6">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-700 mb-4">CONTACT</h2>
            <div className="mb-4">
              <p className="font-bold">Address</p>
              <p>{personalDetails.address}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Phone</p>
              <p>{personalDetails.phone}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Email</p>
              <p>{personalDetails.email}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">{personalDetails.idType}</p>
              <p>{personalDetails.idNumber}</p>
            </div>
            {personalDetails.isAccredited && personalDetails.accreditedOrg && (
              <div className="mb-4">
                <p className="font-bold">{personalDetails.accreditedOrg}</p>
                <p>{personalDetails.accreditedId}</p>
              </div>
            )}
          </div>

          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-blue-700 mb-4">LANGUAGES</h2>
              <ul className="list-none pl-0">
                {languages.map((lang) => (
                  <li key={lang.id} className="mb-2">
                    <p className="font-bold">{lang.language}</p>
                    <p>{lang.proficiency}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hobbies && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-blue-700 mb-4">INTERESTS</h2>
              <p>{hobbies}</p>
            </div>
          )}

          {memberships.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-blue-700 mb-4">MEMBERSHIPS</h2>
              <ul className="list-none pl-0">
                {memberships.map((membership) => (
                  <li key={membership.id} className="mb-3">
                    <p className="font-bold">{membership.name}</p>
                    <p className="text-sm">
                      {formatDate(membership.issueDate)}
                      {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
                    </p>
                    {membership.remarks && <p className="text-sm">{membership.remarks}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:w-2/3 p-6">
          {medicalEducation.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b border-blue-200">EDUCATION</h2>
              <ul className="list-none pl-0">
                {medicalEducation.map((edu) => (
                  <li key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{edu.degree}</p>
                        <p className="text-lg">{edu.institution}</p>
                        {edu.score && <p>Score: {edu.score}</p>}
                        {edu.remarks && <p className="text-sm italic">{edu.remarks}</p>}
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</p>
                        {edu.graduationYear && (
                          <p>Graduation: {format(edu.graduationYear, "yyyy")}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
                
                {additionalEducation.map((edu) => (
                  <li key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{edu.degree}</p>
                        <p className="text-lg">{edu.institution}</p>
                        {edu.score && <p>Score: {edu.score}</p>}
                        {edu.remarks && <p className="text-sm italic">{edu.remarks}</p>}
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</p>
                        {edu.graduationYear && (
                          <p>Graduation: {format(edu.graduationYear, "yyyy")}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b border-blue-200">EXPERIENCE</h2>
              <ul className="list-none pl-0">
                {experiences.map((exp) => (
                  <li key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{exp.role}</p>
                        <p className="text-lg">{exp.organization}</p>
                        <p>{exp.department} ({exp.type})</p>
                        {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {awards.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b border-blue-200">HONORS & AWARDS</h2>
              <ul className="list-none pl-0">
                {awards.map((award) => (
                  <li key={award.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{award.title}</p>
                        <p>{award.organization}</p>
                        {award.description && <p className="text-sm italic">{award.description}</p>}
                      </div>
                      {award.date && (
                        <div className="text-right text-gray-600">
                          <p>{format(award.date, "yyyy")}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {((useSimplePublications && simplePublications.length > 0) || 
            (!useSimplePublications && detailedPublications.length > 0)) && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b border-blue-200">PUBLICATIONS</h2>
              <ul className="list-none pl-0">
                {useSimplePublications ? (
                  simplePublications.map((pub) => (
                    <li key={pub.id} className="mb-3">
                      {pub.text}
                    </li>
                  ))
                ) : (
                  detailedPublications.map((pub) => (
                    <li key={pub.id} className="mb-3">
                      {pub.authors}. ({pub.date ? format(pub.date, "yyyy") : "n.d."}). 
                      <em> {pub.title}</em>. {pub.journal}. 
                      {pub.doi && <span> DOI: {pub.doi}</span>}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
