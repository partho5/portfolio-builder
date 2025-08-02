// client/src/app/[username]/page.tsx

import ProjectSlider from "@/components/ui/projects/ProjectSlide";
import ProjectsGrid from "@/app/[username]/components/ProjectsGrid";

export default function Home() {
    return (
        <main className="w-full min-h-screen mt-0 p-1 md:p-4">
            <ProjectsGrid />
        </main>
    );
}
