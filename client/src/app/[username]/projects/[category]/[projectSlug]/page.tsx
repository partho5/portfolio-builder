// src/app/[username]/projects/category/[projectSlug]/page.tsx

import React from 'react';
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import {ComponentConfig, LandingPageConfig} from "@/modules/landing-page-builder/types";
import {LandingPageComponent} from "@/modules/landing-page-builder/components";
import ProjectClient from "@/app/components/ProjectClient";
import {Metadata} from "next";
import {RightArrowAnimated} from "@/modules/landing-page-builder/components/shapes/RightArrow";
import style from '../../../../../components/ui/projects/projectPage.module.css';
import RectangleWithBadge from "@/modules/landing-page-builder/components/shapes/RectangleWithBadge";
import {API_BASE_URL} from "@/app/config/values";

type PageProps = {
    params: {
        username: string;
        category: string;
        projectSlug: string;
    };
};


// Replace the mock fetchProject with a real API call
async function fetchProject(username: string, category: string, projectSlug: string) {
    const endPoint = `${API_BASE_URL}/public/${username}/projects/${category}/${projectSlug}`;
    // console.log(`fetchProject() endPoint= API_BASE_URL= ${API_BASE_URL} \n ${endPoint}`);
    const res = await fetch(endPoint, { cache: 'no-store' });

    if (!res.ok) {
        console.error(`API Error: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to fetch project: ${res.status}`);
    }
    return res.json();
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username, projectSlug } = params;

    // Fetch project data for dynamic metadata
    const projectConfig = {
        title: 'title', description: 'description', tags: 'tags', imageUrl: 'imageUrl'
    };


    return {
        title: `${projectConfig.title} by ${username}`,
        description: projectConfig.description,
        keywords: projectConfig.tags,
        // openGraph: {
        //     title: `${projectConfig.title} by ${username}`,
        //     description: projectConfig.description,
        //     images: [projectConfig.imageUrl],
        // },
        // twitter: {
        //     card: 'summary_large_image',
        //     title: `${projectConfig.title} by ${username}`,
        //     description: projectConfig.description,
        //     images: [projectConfig.imageUrl],
        // },
    };
}


export default async function ProjectPage({ params }: PageProps) {
    const { username, category, projectSlug } = params;
    let project: any = null;
    let projectConfig;
    try {
        project = await fetchProject(username, category, projectSlug);
        //console.log(`ProjectPage: ${JSON.stringify(project)}`);
        if(project){
            projectConfig = project?.config;
        }
    } catch (e) {
        return <div className="text-center p-8 text-red-600">Project not found.</div>;
    }

    return (
        <div className="w-full mx-auto">
            {/* SECTION: Title */}
            <section className={style.title}>
                <h1 className="mt-4 text-xl md:text-4xl text-blue-500 font-bold text-center drop-shadow-sm md:drop-shadow-md shadow-black">
                    {project?.name}
                </h1>
                <p className="text-gray-600 text-center">By {params.username}</p>
            </section>

            {/* SECTION: Hero / Builder Output */}
            <section className={style.builder}>
                <div className="w-full max-w-6xl mx-auto my-2 md:my-8" style={{fontFamily: 'var(--font-andika)'}}>
                    <LandingPageComponent config={projectConfig} enableAnimations/>
                </div>
            </section>

            {/* SECTION: Arrow-based Breakdown */}
            <section className={`${style.breakdown}`}>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex gap-0 items-center">
                            <div className="flex-1 text-center p-0 rounded">
                                <LandingPageComponent
                                    config={[{
                                        componentType: 'rectangle',
                                        content: "<div class='text-black text-xs md:text-3xl p-0 md:p-4'>Left shape</div>",
                                        styleName: 'glowWhite',
                                        size: 100,
                                        positioning: 'center',
                                        animation: 'slideLeft'
                                    }]}
                                    enableAnimations
                                    debug={false}
                                />
                            </div>
                            <div className="w-12 md:w-40 text-center rounded font-semibold whitespace-nowrap">
                                <RightArrowAnimated fromColor="#faac02" toColor="#bf8506"/>
                            </div>
                            <div className="flex-1 text-center p-0 rounded">
                                <LandingPageComponent
                                    config={[{
                                        componentType: 'rectangle',
                                        content: "<div class='text-black text-xs md:text-3xl p-0 md:p-4'>Right shape</div>",
                                        styleName: 'glowWhite',
                                        size: 100,
                                        positioning: 'center',
                                        animation: 'slideLeft'
                                    }]}
                                    enableAnimations
                                    debug={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* SECTION: Tagline */}
            <section className={style.tagline}>
                <div className="text-center text-xl md:text-2xl" style={{fontFamily: 'var(--font-andika)'}}>
                    This software is an
                </div>
            </section>

            {/* SECTION: AI Agent */}
            <section className={style.agent}>
                <div style={{fontFamily: 'var(--font-enriqueta)'}}>
                    <LandingPageComponent
                        config={[{
                            componentType: 'circle',
                            content: "<div class='text-xl md:text-2xl p-4 font-extrabold text-center'>Circle<br>Shape 25</div>",
                            styleName: 'glowRed',
                            size: 25,
                            positioning: 'center',
                            animation: 'fadeIn'
                        }]}
                        enableAnimations
                        debug={false}
                    />

                    <LandingPageComponent
                        config={[{
                            componentType: 'circle',
                            content: "<div class='text-xl md:text-2xl p-4 font-extrabold text-center'>Circle<br>Shape 33</div>",
                            styleName: 'glowRed',
                            size: 33,
                            positioning: 'center',
                            animation: 'fadeIn'
                        }]}
                        enableAnimations
                        debug={false}
                    />


                    <LandingPageComponent
                        config={[{
                            componentType: 'circle',
                            content: "<div class='text-xl md:text-2xl p-4 font-extrabold text-center'>Circle<br>Shape 50</div>",
                            styleName: 'glowRed',
                            size: 50,
                            positioning: 'center',
                            animation: 'fadeIn'
                        }]}
                        enableAnimations
                        debug={false}
                    />

                    <LandingPageComponent
                        config={[{
                            componentType: 'circle',
                            content: "<div class='text-xl md:text-2xl p-4 font-extrabold text-center'>Circle<br>Shape 75</div>",
                            styleName: 'glowRed',
                            size: 75,
                            positioning: 'center',
                            animation: 'fadeIn'
                        }]}
                        enableAnimations
                        debug={false}
                    />

                    <LandingPageComponent
                        config={[{
                            componentType: 'circle',
                            content: "<div class='text-xl md:text-2xl font-extrabold text-center'>Circle<br>Shape 100</div>",
                            styleName: 'glowRed',
                            size: 100,
                            positioning: 'center',
                            animation: 'fadeIn'
                        }]}
                        enableAnimations
                        debug={false}
                    />

                </div>
            </section>

            {/* SECTION: Data Sources Title */}
            <section className={style.datasourcesTitle}>
                <div className="text-center text-3xl" style={{fontFamily: 'var(--font-andika)'}}>
                    that pulls data from 👇
                </div>
            </section>


            <section className={`${style.footer} ${style.projectBackground} min-h-screen`}>
                <div className="text-center w-48 mx-auto">
                    <p className="border-red-500 border-b">To implement</p>
                    <div>Testimonial</div>
                    <div>FAQ</div>
                </div>
            </section>

            <section className={`${style.footer} min-h-screen`}>
                <div className="text-center w-48 mx-auto">
                    <p className="border-red-500 border-b">To implement</p>
                    <div>Testimonial</div>
                    <div>FAQ</div>
                </div>
            </section>
        </div>
    );
}
