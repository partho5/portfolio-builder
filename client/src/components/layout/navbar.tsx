// client/src/components/navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';
import style from './navbar.module.css';
import {useProjects} from "@/contexts/ProjectContext";
import {useProfile} from "@/contexts/ProfileContext";
import LogoutButton from "@/components/common/LogoutButton";

export default function Navbar({
                                 isOpen,
                                 setIsOpen,
                                 data
                               }: {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  data?: { username: string }
}) {

  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  const segments = pathname?.split('/'); // ["", "partho5", "projects", "mobile-apps"]
  const activeCategory = segments? segments[3] : ''; // index 3 is the category

  const projects = useProjects();

  // Extract unique categories from projects
  const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));

  // Generate dynamic itemLinks
  const dynamicItemLinks = [
    { name: 'All Projects', categorySlug: 'all' },
    ...uniqueCategories.map(category => ({
      name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      categorySlug: category
    }))
  ];

  const navItems = {
    itemLinks: dynamicItemLinks,
    anchorLinks: {
      loginItem: { name: 'Login', href: '/api/auth/login' },
      logoutItem: { name: 'Logout', href: '/api/auth/logout' },
    },
  };

  let authNavItem = navItems.anchorLinks.loginItem;
  if (!isLoading && user) {
    authNavItem = navItems.anchorLinks.logoutItem;
  }

  const profile = useProfile();

  // Helper function to get user initials for avatar
  const getUserInitials = (user: any) => {
    if (user?.name) {
      return user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
      <nav className="fixed w-full z-30 top-0 text-black bg-slate-100 opacity-95">
        <div className="container flex flex-wrap items-center justify-between py-2">
          <div className={`ml-3 text-xl italic ${style.animateSlideLeft} opacity-0`}>
            <span className="font-semibold">Portfolio Projects</span> by <span className="font-semibold">{profile?.displayName}</span>
          </div>

          {/* Mobile menu button */}
          <div className="block lg:hidden pr-4">
            <button id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              {isOpen ? (
                  <svg
                      className="fill-current h-6 w-6"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setIsOpen(false)}
                  >
                    <title>Close</title>
                    <path
                        fillRule="evenodd"
                        d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z"
                        clipRule="evenodd"
                    />
                  </svg>
              ) : (
                  <svg
                      className="fill-current h-6 w-6"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setIsOpen(true)}
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div
              className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0"
              id="nav-content">

            {/* Navigation links */}
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              {navItems.itemLinks.map((item) => (
                  <li key={item.categorySlug}>
                    <Link
                        href={`/${data?.username}/projects/${item.categorySlug}`}
                        onClick={() => setIsOpen(false)}
                        className={`
                      relative inline-block px-2 mx-1 py-2 text-sm font-medium rounded
                      transition-all duration-300 ease-out
                      hover:transform hover:translateY-[-2px] hover:shadow-lg
                      ${item.categorySlug === activeCategory
                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 border border-transparent'}
                    `}
                    >
                      {item.name}
                    </Link>
                  </li>
              ))}
            </ul>

          </div>
        </div>

      </nav>
  );
}