"use client";
import React from "react";
import ProjectItem from "../sub/ProjectItem"; // Import the new component
import { projects } from "./projectData";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 relative z-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      
      {/* Container for the projects and the central line */}
      <div className="relative w-full flex flex-col items-center px-4 md:px-10">
        {/* Central vertical line, visible on medium screens and up */}
        <div className="hidden md:block absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-purple-500 to-cyan-500 transform -translate-x-1/2 z-10"></div>
        
        <div className="flex flex-col gap-16 w-full max-w-7xl relative z-20">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
      
      <a href="https://github.com/UsmanBari" target="_blank" rel="noopener noreferrer" className="mt-10">
        <button className="px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300">
          View More Projects
        </button>
      </a>
    </div>
  );
};

export default Projects;