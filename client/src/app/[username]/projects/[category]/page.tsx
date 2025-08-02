// client/src/app/[username]/projects/[category]/page.tsx

import React from 'react';
import CategoryClient from "@/app/components/CategoryClient";

type PageProps = {
    params: {
        username: string;
        category: string;
    };
};

export default function CategoryPage({ params }: PageProps) {
    const { username, category } = params;

    // TODO: Fetch projects filtered by category
    // const projects = await fetchProjectsByCategory(username,

    return (
        <div className="p-1 md:p-4">
            <CategoryClient category={category} />
        </div>
    );
}
