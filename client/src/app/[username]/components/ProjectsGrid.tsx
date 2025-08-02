// client/src/app/[username]/components/ProjectsGrid.tsx

'use client';

import ProjectSlider from "@/components/ui/projects/ProjectSlide";
import { useProjects } from "@/contexts/ProjectContext";

export default function ProjectsGrid() {
    const projects = useProjects();
    // console.log(projects);

    return (
        <main className="w-full min-h-screen mt-0 p-1 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectSlider key={index} project={project} />
                ))}
            </div>
        </main>
    );
}