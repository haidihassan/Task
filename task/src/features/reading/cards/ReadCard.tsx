'use client';
import React, { Suspense } from 'react';
import { appAssets } from '@/constants/appAssets';

const LazyReadContent = React.lazy(() => import('../pages/ReadingPage'));

export default function ReadCard() {
    return (
        <div className="card">
            <h3>Read Items</h3>
            <p>Description: Read</p>
            <img src={appAssets.read} alt="Read" />
            <Suspense fallback={<div>Loading...</div>}>
                <LazyReadContent />
            </Suspense>
            <button>Visit</button>
        </div>
    );
}
