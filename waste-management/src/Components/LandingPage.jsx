import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './NavBar'
import img4 from '../assets/img4.png';
import img2 from '../assets/img2.png';
import img1 from '../assets/img1.png';
import img3 from '../assets/img3.png';

const Section = ({ title, description, imageSrc, imageAlt, imageLeft = true, children }) => (
  <section className="min-h-screen flex justify-center items-center px-6 py-12 bg-green-50 scroll-mt-20 transition duration-700 ease-in-out">
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl">
      {imageLeft && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />
      )}
      <div className="container text-center md:text-left md:w-1/2">
        <h2 className="text-4xl font-bold text-green-800 mb-4">{title}</h2>
        <p className="text-lg text-green-700 mb-6">{description}</p>
        {children}
      </div>
      {!imageLeft && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />
      )}
    </div>
  </section>
);



const Footer = () => (
  <footer className="bg-green-100 text-green-700 py-6 text-center">
    <p>&copy; 2025 EcoTrack. All rights reserved.</p>
  </footer>
);

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="scroll-smooth">
      <Navbar />

      <div id="section1">
        <Section
          title="Smart Waste Management"
          description="Addressing inefficient waste management through real-time tracking, reporting, education, and community engagement."
          imageSrc={img1}
          imageAlt="Smart Waste Management"
          imageLeft={true}
        >
          <button
            onClick={handleGetStarted}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Get Started
          </button>
        </Section>
      </div>

      <div id="section2">
        <Section
          title="Track Collection Vehicles"
          description="Users can monitor garbage collection vehicles in real-time, ensuring efficient and transparent waste pickup processes."
          imageSrc={img2}
          imageAlt="Vehicle Tracking"
          imageLeft={false}
        />
      </div>

      <div id="section3">
        <Section
          title="Report Overflowing Bins"
          description="Easily report uncollected or overflowing bins to municipal authorities with just a tap, encouraging timely intervention."
          imageSrc={img3}
          imageAlt="Reporting Feature"
          imageLeft={true}
        />
      </div>

      <div id="section4">
        <Section
          title="Educate & Engage"
          description="Access educational resources on waste segregation, composting, and recycling. Join cleanup drives and earn rewards."
          imageSrc={img4}
          imageAlt="Educational Resources"
          imageLeft={false}
        />
      </div>

      <Footer />
    </div>
  );
}
