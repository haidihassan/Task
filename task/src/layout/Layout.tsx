'use client';
import React from 'react';
import { SpotlightNewDemo } from '@/components/background';

interface LayoutProps {
    children: React.ReactNode; 
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative">
            <SpotlightNewDemo>
                <div className="flex flex-col items-center justify-center px-4">{children}</div>
            </SpotlightNewDemo>
        </div>
    );
};
