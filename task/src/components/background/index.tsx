import React, { ReactNode } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

interface SpotlightNewDemoProps {
  children: ReactNode; 
}

export function SpotlightNewDemo({ children }: SpotlightNewDemoProps) {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className="max-w-7xl mx-auto z-10 w-full pt-20 md:pt-0">
        {children}
      </div>
    </div>
  );
}
