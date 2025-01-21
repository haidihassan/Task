'use client';
import React, { Suspense } from 'react';
import { appAssets } from '@/constants/appAssets';
import { CircularProgress } from '@mui/material';

const LazyCreateContent = React.lazy(() => import('../pages/CreatingPage'));

export default function CreateCard() {
    return (
        
        <div className="card">
            <img src={appAssets.create} alt="Create" />
            <h3>Create Items</h3>
            <p>Description: Create</p>
            <Suspense fallback={<CircularProgress />}>
                <LazyCreateContent />
            </Suspense>
            <button>Visit</button>
        </div>
    );
}
