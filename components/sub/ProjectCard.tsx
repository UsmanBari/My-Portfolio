import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  src: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[]; // Add the tags prop
}

const ProjectCard = ({ src, title, description, liveUrl, githubUrl, tags }: Props) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] transition-transform duration-300 hover:scale-105"
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
        
        {/* Tags Section */}
        {tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-semibold text-white bg-purple-500 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons Section */}
        <div className="flex gap-4 mt-4">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300">
                Live Demo
              </button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="px-4 py-2 text-sm text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300">
                GitHub
              </button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;