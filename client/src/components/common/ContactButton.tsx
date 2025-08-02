'use client';

import React from 'react';

type ContactButtonProps = {
    text: string;
    onClick?: () => void;
};

export default function ContactButton({ text, onClick }: ContactButtonProps) {
    return (
        <div className="p-4">
            <button
                onClick={onClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-full
          border-2 border-transparent hover:border-blue-400 hover:scale-105 hover:shadow-lg
          py-3 px-6 shadow-md transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          active:scale-95"
            >
                {text}
            </button>
        </div>
    );
}
