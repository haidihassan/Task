'use client';
import React from 'react';
import { BackgroundLines } from '@/components/ui/background-lines';
import { Spotlight } from '@/components/ui/spotlight-new';
import { SpotlightNewDemo } from '@/components/background';

interface LayoutProps {
    children: React.ReactNode; // Ensure `children` is typed correctly
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative">
            <SpotlightNewDemo>
                {/* Content */}
                <div className="flex flex-col items-center justify-center px-4">{children}</div>
            </SpotlightNewDemo>
        </div>
    );
};
