'use client';
import React from 'react';
import MorphingText from '@/components/ui/morphing-text';
import { ExpandableCardDemo } from '@/components/Cards';
import CreateCard from '@/features/creating/cards/CreateCard';
import UpdateCard from '@/features/updating/cards/UpdateCard';
import ReadCard from '@/features/reading/cards/ReadCard';
import DeleteCard from '@/features/deleting/cards/DeleteCard';
const texts = ['New', 'Task'];

export default function HomeContainer() {
    return (
        <>
            <MorphingText texts={texts} />
                <ExpandableCardDemo>
                    {/* Cards will be passed here */}
                    <CreateCard />
                    <ReadCard />
                    <UpdateCard />
                    <DeleteCard />
                </ExpandableCardDemo>
        </>
    );
}
