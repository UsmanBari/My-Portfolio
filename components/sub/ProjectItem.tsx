import React from 'react';
import ProjectCard from './ProjectCard';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface ProjectItemProps {
  project: {
    title: string;
    description: string;
    src: string;
    liveUrl?: string;
    githubUrl?: string;
    tags?: string[];
  };
  index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`relative w-full md:w-[45%] lg:w-[40%] flex-shrink-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      <ProjectCard
        src={project.src}
        title={project.title}
        description={project.description}
        liveUrl={project.liveUrl}
        githubUrl={project.githubUrl}
        tags={project.tags}
      />
    </motion.div>
  );
};

export default ProjectItem;