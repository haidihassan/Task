'use client';
import React from 'react';
import MorphingText from '@/components/ui/morphing-text';
import { ExpandableCardDemo } from '@/components/cards';
import { cards } from '../constants/constants';

const texts = ['The', 'Car' ,'Site'];

export default function HomeContainer() {
    return (
        <>
            <MorphingText texts={texts} />
            <div className="mt-6">
                <ExpandableCardDemo cards={cards} />
            </div>
        </>
    );
}
