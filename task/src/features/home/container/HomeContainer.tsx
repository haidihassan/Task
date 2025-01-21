'use client';
import React from 'react';
import MorphingText from '@/components/ui/morphing-text';
import { ExpandableCardDemo } from '@/components/Cards';

const texts = ['New', 'Task'];

export default function HomeContainer() {
    return (
        <>
            <MorphingText texts={texts} />
            <ExpandableCardDemo />
        </>
    );
}
