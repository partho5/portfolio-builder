// client/src/app/[username]/layout.tsx

import UsernameClient from "@/app/components/UsernameClient";
import {ProfileProvider} from "@/contexts/ProfileContext";
import {ProjectProvider} from "@/contexts/ProjectContext";
import {API_BASE_URL} from "@/app/config/values";
import {getSession} from "@auth0/nextjs-auth0";
import {redirect} from "next/navigation";

export default async function UsernameLayout({ children, params }: { children: React.ReactNode, params: { username: string } }) {
    // Fetch profile data on the server using the username param, from the public route
    const res = await fetch(`${API_BASE_URL}/public/profile/${params.username}`, { cache: 'no-store' });
    const profile = await res.json();
    // console.log('Fetched profile:', profile);
    if (profile?.error) {
        return (
            <div className="text-center p-8 text-red-600 min-h-screen">
                <h1 className="text-2xl font-bold">{profile.error}</h1>
                <p className="mt-2">{profile.message}</p>
            </div>
        );
    }
    if (!profile || Object.keys(profile).length === 0) {
        return <div className="text-center p-8 text-red-600">Profile not found or empty.</div>;
    }

    // Fetch or simulate projects data (replace with real fetch if needed)
    let projects = [];
    try {
        const projectsRes = await fetch(`${API_BASE_URL}/public/projects/${params.username}`, { cache: 'no-store' });
        projects = await projectsRes.json();
    } catch (e) {
        // fallback or error handling
        projects = [];
    }

    // Wrap the subtree with ProfileProvider and ProjectProvider
    return (
        <ProfileProvider profile={profile}>
            <ProjectProvider projects={projects}>
                <UsernameClient profile={profile}>{children}</UsernameClient>
            </ProjectProvider>
        </ProfileProvider>
    );
}
