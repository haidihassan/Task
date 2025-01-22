'use client';
import React from 'react';
import { BackgroundLines } from '@/components/ui/background-lines';

interface LayoutProps {
    children: React.ReactNode; // Ensure `children` is typed correctly
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative">
            {/* Background components */}
            <BackgroundLines className="fixed inset-0 -z-10">
                {/* Content */}
                <div className="relative flex flex-col items-center justify-center px-4">{children}</div>
            </BackgroundLines>
        </div>
    );
};
