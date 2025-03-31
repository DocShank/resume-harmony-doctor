
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoAnimation from '@/components/LogoAnimation';

const WelcomePage = () => {
  const teamMembers = [
    {
      name: "Shashank Neupane",
      credentials: "MBBS",
      designation: "Creator & Lead Developer",
      image: "/lovable-uploads/5ceef8f7-579a-40d6-aef7-9c0f2b016f0d.png",
    },
    {
      name: "Prasamsa Pudasaini",
      credentials: "MBBS",
      designation: "Product Design & Quality Lead",
      image: "/lovable-uploads/1be7fca5-995c-4a49-873d-f3da28e2305e.png",
    },
    {
      name: "Aashriya Neupane",
      credentials: "BBA-Finance",
      designation: "Template & Operations Manager",
      image: "/lovable-uploads/210c1332-8f38-4010-8d31-53acd68ace5c.png",
    },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white flex flex-col items-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl">
        {/* Logo Animation */}
        <div className="mb-16 mt-6">
          <LogoAnimation />
        </div>
        
        {/* Welcome Message */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome, doctors! Craft your professional resume with this specialized tool designed exclusively for 
            medical professionals to create comprehensive, visually striking CVs that showcase your credentials 
            with precision and elegance.
          </p>
          
          <Link to="/builder">
            <motion.button
              className="px-6 py-3 bg-teal-500 text-white rounded-md font-medium text-lg shadow-md hover:bg-teal-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Founding Team Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <h2 className="text-xl font-bold text-gray-800 text-center mb-8">Meet Our Founding Team</h2>
          
          <div className="flex flex-wrap justify-center gap-10">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden mb-3">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-800">{member.name}, {member.credentials}</h3>
                <p className="text-sm text-gray-600">{member.designation}</p>
                
                <div className="mt-2 flex items-center">
                  <a 
                    href="https://creative-cubicle-portal.lovable.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <img 
                      src="/lovable-uploads/8e728aa6-448a-4e8a-a6a5-c02aa41fecfd.png" 
                      alt="Creative Cubicle Nepal Medicos" 
                      className="h-7 w-auto"
                    />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Footer/Watermark */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          Created by Medsume by Shank
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
