// src/app/[username]/[projectSlug]/layout.tsx

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProjectClient from "@/app/components/ProjectClient";

import {Andika, Graduate, Enriqueta} from 'next/font/google'

const fontGraduate = Graduate({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-graduate',
});
const fontAndika = Andika({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-andika',
});
const fontEnriqueta = Enriqueta({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-enriqueta',
});

export default function ProjectLayout({
                                          children,
                                          params,
                                      }: {
    children: React.ReactNode;
    params: { username: string; category: string; projectSlug: string };
}) {
    return (
        <div className={`${fontGraduate.variable} ${fontAndika.variable} ${fontEnriqueta.variable}`}>
            <ProjectClient params={params}>{children}</ProjectClient>
        </div>
    );
}