import React from "react";
import { Link } from "react-router-dom";

const ImageShowcaseSection = () => {
  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-white dark:bg-dark-900" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4">
            Experience the Future of Learning
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Our cutting-edge AI learning platform is designed to transform how you 
            acquire and retain knowledge in any subject area.
          </p>
        </div>
        
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll dark:shadow-elegant-dark">
          <div className="w-full">
            <img 
              src="/images/dc13e94f-beeb-4671-8a22-0968498cdb4c.png" 
              alt="AI-powered learning platform with personalized features" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-white dark:bg-dark-800 p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 dark:text-white">Next Generation Learning</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
              Built with advanced AI and learning science, our platform adapts to your learning style,
              helping you master any subject faster and more effectively than traditional methods.
            </p>
            <Link to="/signup" className="inline-block px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-medium rounded-full transition-colors duration-300">
              Start Learning Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
