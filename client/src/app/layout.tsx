import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AuthProvider } from '../contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>Portfolio Projects</title>
        </head>
        <body className={inter.className}>
        <UserProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </UserProvider>
        </body>
        </html>
    );
}