'use client';
import React, { Suspense } from 'react';
import { appAssets } from '@/constants/appAssets';
import { CircularProgress } from '@mui/material'; // For loading spinner

const LazyDeleteContent = React.lazy(() => import('../pages/DeletePage'));

export default function DeleteCard() {
    return (
        <div className="card">
            <img src={appAssets.delete} alt="Delete" />
            <h3>Delete Items</h3>
            <p>Description: Delete</p>
            <Suspense fallback={<CircularProgress />}>
                <LazyDeleteContent />
            </Suspense>
            <button>Visit</button>
        </div>
    );
}
