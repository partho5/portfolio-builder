// client/src/app/components/ProjectClient.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function ProjectClient({
                                          children,
                                          params,
                                      }: {
    children: React.ReactNode;
    params: { username: string; category: string; projectSlug: string };
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isSidebarVisible = searchParams?.get('sidebar') === 'true';
    const isCenterMode = !isSidebarVisible;

    const toggleSidebar = () => {
        const params = new URLSearchParams(searchParams?.toString());

        if (isSidebarVisible) {
            // Hide sidebar - remove the parameter
            params.delete('sidebar');
        } else {
            // Show sidebar - add the parameter
            params.set('sidebar', 'true');
        }

        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        if(newUrl){
            router.push(newUrl);
        }
    };

    return (
        <>
            {/* Professional Floating Toggle Button */}
            <button
                onClick={toggleSidebar}
                className={`
                    fixed top-0 left-0 md:top-12 md:left-6 z-50 
                    group
                    flex items-center gap-2
                    bg-white 
                    border border-gray-200 
                    shadow-lg hover:shadow-xl
                    px-4 py-3 
                    rounded-full
                    transition-all duration-300 ease-in-out
                    hover:scale-105
                    hover:bg-gray-50
                    ${isSidebarVisible ? 'hover:bg-red-50' : 'hover:bg-blue-50'}
                `}
                aria-label={isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            >
                {/* Icon with smooth rotation */}
                <div className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                    {isSidebarVisible ? (
                        <ChevronLeft className="w-5 h-5 text-red-600" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-blue-600" />
                    )}
                </div>

                {/* Dynamic text */}
                <span className={`
                    text-sm font-medium transition-colors duration-200
                    ${isSidebarVisible ? 'text-red-700' : 'text-blue-700'}
                `}>
                    {isSidebarVisible ? '' : 'Contact Dev'}
                </span>
            </button>

            {/* Alternative: Icon-only professional button */}
            {/*
            <button
                onClick={toggleSidebar}
                className={`
                    fixed top-6 left-6 z-50
                    w-12 h-12
                    bg-white
                    border border-gray-200
                    shadow-lg hover:shadow-xl
                    rounded-full
                    flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    hover:scale-110
                    group
                    ${isSidebarVisible ? 'hover:bg-red-50' : 'hover:bg-blue-50'}
                `}
                aria-label={isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            >
                <div className="transition-all duration-300 ease-in-out group-hover:scale-110">
                    {isSidebarVisible ? (
                        <X className="w-5 h-5 text-red-600" />
                    ) : (
                        <Menu className="w-5 h-5 text-blue-600" />
                    )}
                </div>
            </button>
            */}




            {/* Main project content */}
            <div className="p-1 md:p-4 min-h-screen w-full mx-auto max-w-6xl">
                {children}
            </div>
        </>
    );
}