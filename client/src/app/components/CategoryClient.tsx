// client/src/components/CategoryClient.tsx
'use client';

import { useEffect, useState } from 'react';
import ProjectSlider from "@/components/ui/projects/ProjectSlide";
import { useProjects } from "@/contexts/ProjectContext";

export default function CategoryClient({ category }: { category: string }) {
    const projects = useProjects();
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayProjects, setDisplayProjects] = useState(projects);

    useEffect(() => {
        // Start transition
        setIsTransitioning(true);

        // After fade out, update projects
        const timer = setTimeout(() => {
            const newProjects = category === 'all'
                ? projects
                : projects.filter((project) => project.category === category);

            setFilteredProjects(newProjects);
            setDisplayProjects(newProjects);

            // Fade back in
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 300);

        return () => clearTimeout(timer);
    }, [category, projects]);

    return (
        <div className="relative min-h-[400px]">
            {/* Loading overlay during transition */}
            {isTransitioning && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            )}

            {/* Projects grid with transition */}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out transform ${
                    isTransitioning
                        ? 'opacity-0 scale-95 translate-y-4'
                        : 'opacity-100 scale-100 translate-y-0'
                }`}
            >
                {displayProjects.map((project, index) => (
                    <div
                        key={`${category}-${index}`}
                        className={`transition-all duration-700 ease-out transform ${
                            isTransitioning
                                ? 'opacity-0 translate-y-8 scale-95'
                                : 'opacity-100 translate-y-0 scale-100'
                        }`}
                        style={{
                            transitionDelay: isTransitioning ? '0ms' : `${index * 100}ms`
                        }}
                    >
                        <ProjectSlider project={project} />
                    </div>
                ))}
            </div>

            {/* Empty state with animation */}
            {!isTransitioning && displayProjects.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <div className="text-6xl mb-4 text-gray-300">📁</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Found</h3>
                    <p className="text-gray-500">No projects match the selected category.</p>
                </div>
            )}
        </div>
    );
}