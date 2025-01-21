'use client';
import React, { Suspense } from 'react';
import { appAssets } from '@/constants/appAssets';
import { CircularProgress } from '@mui/material'; // Optional: For showing a loading spinner

const LazyUpdateContent = React.lazy(() => import('../pages/UpdatingPage'));

export default function UpdateCard() {
    return (
        <div className="card">
            <img src={appAssets.update} alt="Update" />
            <h3>Update Items</h3>
            <p>Description: Update</p>
            <Suspense fallback={<CircularProgress />}>
                <LazyUpdateContent />
            </Suspense>
            <button>Visit</button>
        </div>
    );
}
