import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaRecycle, FaWater, FaLightbulb, FaBook, FaHandsHelping } from "react-icons/fa";
import {Link} from 'react-router-dom'
const topics = [
  {
    icon: <FaLeaf className="text-green-600 text-3xl" />,
    title: "Composting",
    description:
      "Learn how to turn kitchen and garden waste into nutrient-rich compost for soil enrichment."
  },
  {
    icon: <FaRecycle className="text-green-600 text-3xl" />,
    title: "Waste Segregation",
    description:
      "Understand the importance of separating biodegradable and non-biodegradable waste."
  },
  {
    icon: <FaWater className="text-green-600 text-3xl" />,
    title: "Water Conservation",
    description:
      "Tips to conserve water through smart usage and recycling greywater at home."
  },
  {
    icon: <FaLightbulb className="text-green-600 text-3xl" />,
    title: "DIY Reuse Hacks",
    description:
      "Creative ideas to repurpose household items like bottles, jars, and old clothes."
  },
  {
    icon: <FaHandsHelping className="text-green-600 text-3xl" />,
    title: "Community Engagement",
    description:
      "Join local cleanup drives and awareness campaigns to contribute to a greener society."
  },
  {
    icon: <FaBook className="text-green-600 text-3xl" />,
    title: "Daily Waste Reduction",
    description:
      "Simple habits to minimize daily waste output and lead an eco-conscious lifestyle."
  }
];

const EducationalResources = () => {
  return (
    <div className="p-4 sm:p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 text-center">
        Educational Resources
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {topic.icon}
              <h3 className="text-xl font-semibold text-green-700">{topic.title}</h3>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">
              {topic.description}
            </p>
            <Link to="/composting">
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
              Learn More
            </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-green-800 text-lg mb-2 font-medium">Want to dive deeper?</p>
        <a
          href="https://www.epa.gov/recycle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 hover:underline"
        >
          Explore EPA's Official Recycling and Waste Management Guide
        </a>
      </div>
    </div>
  );
};

export default EducationalResources;

// Add this route to your App.jsx or main router file to link this page:
// import EducationalResources from "./pages/EducationalResources";
// <Route path="/educational-resources" element={<EducationalResources />} />

// And add a link to your Navbar (Engage section):
// <Link to="/educational-resources" className="hover:text-green-600 transition">Educational Resources</Link>
