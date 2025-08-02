// client/src/app/components/UsernameClient.tsx

'use client';

import {useEffect, useState} from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/layout/navbar';
import ContactButton from '@/components/common/ContactButton';
import style from './UserClient.module.css';
import {useAuth} from "@/contexts/AuthContext";
import LogoutButton from "@/components/common/LogoutButton";
import Link from "next/link";

export default function UsernameClient({ children, profile }: { children: React.ReactNode, profile: any }) {
    const { accessToken, isLoading, error } = useAuth();
    //const { user: auth0User, isLoading: auth0UserLoading } = useUser();
    const { user } = useUser();

    const [userData, setUserData] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const showSidebar = searchParams?.get('sidebar') === 'true';
    const isProjectPage = pathname ? pathname.match(/\/projects\/[^/]+\/[^/]+$/) : false;
    const shouldHideSidebar = isProjectPage && !showSidebar;

    const [isAnimating, setIsAnimating] = useState(false);
    const [showContent, setShowContent] = useState(!shouldHideSidebar);

    useEffect(() => {
        if (shouldHideSidebar !== !showContent) {
            setIsAnimating(true);

            if (shouldHideSidebar) {
                // Hide sidebar first, then content
                setTimeout(() => {
                    setShowContent(false);
                    setIsAnimating(false);
                }, 300);
            } else {
                // Show content first, then animate in
                setShowContent(true);
                setTimeout(() => setIsAnimating(false), 300);
            }
        }
    }, [shouldHideSidebar, showContent]);

    const username = profile?.username || 'partho5'; // default to the profile of the developer of this site :D
    const skillSet = profile?.skillSet || [];
    const displayName = profile?.displayName || '';
    const role = profile?.role || '';
    const services = profile?.services || [];
    const bio = profile?.bio || '';
    const contactButtonLabel = profile?.contactButtonLabel || 'Contact Me';
    const hireButtonLabel = profile?.hireButtonLabel || 'Hire Me';


    return (
        <div className={`${style.projectBackground}`}>
            <div
                className={`transition-all duration-500 ease-in-out ${
                    shouldHideSidebar ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
            >
                {!shouldHideSidebar && (
                    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={{username}} />
                )}
            </div>

            <div
                className={`min-h-screen transition-all duration-500 ease-in-out ${
                    shouldHideSidebar ? 'pt-0' : 'pt-12'
                }`}
            >
                {shouldHideSidebar ? (
                    <main className={`${style.projectBackground}`}>
                        {children}
                    </main>
                ) : (
                    <div className="flex flex-col md:flex-row min-h-screen">
                        {/* Sidebar with enhanced animations */}
                        <div
                            className={`fixed inset-0 z-50 md:static md:z-auto md:flex md:flex-col transition-all duration-500 ease-in-out transform ${
                                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                            } md:translate-x-0 md:opacity-100`}
                        >
                            {/* Backdrop (mobile only) */}
                            <div
                                className={`absolute inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
                                    isOpen ? 'block' : 'hidden'
                                }`}
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Sidebar Content */}
                            <aside
                                className="relative bg-slate-100 w-4/5 md:w-80 md:flex-shrink-0 h-full overflow-y-auto">
                                <div className="p-4 pt-0 md:pt-8">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/8064717?v=4"
                                        alt="Profile"
                                        className="rounded-full mx-auto"
                                    />
                                    <div className="mt-4 text-center">
                                      <span className="toggleColour text-xl lg:text-2xl text-blue-500">
                                        <a href={`/${username}`}>{displayName}</a>
                                      </span>
                                    </div>
                                    <div className="text-center text-xl md:text-xl font-semibold text-gray-800 mt-4">
                                        {role}
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 text-center">
                                        {bio}
                                    </p>
                                </div>


                                <ContactButton text={contactButtonLabel}
                                               onClick={() => console.log(`${contactButtonLabel} clicked`)}/>

                                <div className="skills border-t-2 border-gray-200 p-4">
                                    <h2 className="text-center bg-black text-white py-2">Skill Set</h2>
                                    <ul className="flex flex-wrap gap-2 my-4">
                                        {skillSet.map((skill: any) => (
                                            <li
                                                key={skill.id || skill}
                                                className="bg-blue-100 text-black px-3 py-1 rounded-full text-xs border-transparent border-2 hover:border-white transition duration-150"
                                            >
                                                {skill.name || skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="services border-t-2 border-gray-200 p-4">
                                    <h2 className="text-center bg-black text-white border-b-2 py-2">Service Area</h2>
                                    <ul className="space-y-2 mt-4">
                                        {services.map((service: any, index: number) => (
                                            <li key={service.id || index}
                                                className="flex items-center gap-2 text-sm py-1 px-2 hover:bg-white rounded transition-colors">
                                                {/* You can add icon rendering logic here if needed */}
                                                <span>{service.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <ContactButton text={hireButtonLabel}
                                               onClick={() => console.log(`${hireButtonLabel} clicked`)}/>

                                <div className="my-8 text-xs text-center">
                                    <div className="flex justify-center items-center gap-8">
                                        <div className="login-link">
                                            {user ? (
                                                <LogoutButton>Logout</LogoutButton>
                                            ) : (
                                                <span>
                                                    Do you own this portfolio? &nbsp;
                                                    <Link href={`/api/auth/login?returnTo=/${username}`} className="text-blue-500 hidden">Login</Link>
                                                    <Link href={`/dashboard`} className="text-blue-500">Dashboard</Link>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </aside>
                        </div>

                        {/* wrapper of all kinds of project view */}
                        <main className="transition-all duration-500 ease-in-out w-full ">
                            {children}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );

}
