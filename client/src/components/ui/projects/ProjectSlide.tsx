// client/src/components/ui/projects/ProjectSlide.tsx

"use client";

import './ProjectSlide.css';

import {useState} from "react";
import {textToSlug, truncateText} from "@/utils/StringUtils";
import Link from "next/link";
import {useProjects} from "@/contexts/ProjectContext";
import {useProfile} from "@/contexts/ProfileContext";

const ProjectSlider = ({ project }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrevClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex(currentIndex === 0 ? project.media.length - 1 : currentIndex - 1);
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex(currentIndex === project.media.length - 1 ? 0 : currentIndex + 1);
    };

    let username = 'protim';

    const profile = useProfile();

    return (
        <div
            className="project bg-white shadow-lg rounded-xl min-h-full overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden h-64">
                {/* Navigation arrows with enhanced styling */}
                {project.media.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevClick}
                            className={`prev-btn absolute top-1/2 left-2 transform -translate-y-1/2 p-2 z-20 
                                bg-black/50 text-white rounded-full transition-all duration-300 ease-out
                                hover:bg-black/70 hover:scale-110 backdrop-blur-sm
                                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>

                        <button
                            onClick={handleNextClick}
                            className={`next-btn absolute top-1/2 right-2 transform -translate-y-1/2 p-2 z-20 
                                bg-black/50 text-white rounded-full transition-all duration-300 ease-out
                                hover:bg-black/70 hover:scale-110 backdrop-blur-sm
                                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </>
                )}

                {/* Enhanced slide content */}
                <div className="w-full h-full overflow-hidden">
                    <div
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{transform: `translateX(-${currentIndex * 100}%)`}}
                    >
                        {project.media.map((mediaUrl, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden group">
                                {mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.png') || mediaUrl.endsWith('.jpeg') || mediaUrl.endsWith('.webp') ? (
                                    <img
                                        src={mediaUrl}
                                        alt={`Project ${index}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                                    />
                                ) : (
                                    <iframe
                                        className="w-full h-full"
                                        src={mediaUrl}
                                        title={`Project ${index} Video`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slide indicators */}
                {project.media.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {project.media.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/80'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>


            {/* Enhanced project info */}
            <div className="p-6 info">
                <Link
                    href={`/${profile?.username}/projects/${project.category}/${textToSlug(project.name)}?sidebar=true`}
                    className="project-link group"
                >
                    <h3 className="mb-3 text-xl text-center font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {project.name}
                    </h3>
                </Link>
                <p className="text-gray-600 text-justify leading-relaxed">
                    {truncateText(project.description)}
                </p>

            </div>
        </div>
    );
};

export default ProjectSlider;
