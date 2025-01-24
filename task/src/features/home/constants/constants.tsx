import { appAssets } from '@/constants/appAssets';
import React from 'react';
import CreatingPage from '@/app/creating/page';
import UpdatingPage from '@/app/updating/page';
import { appPaths } from '@/constants/appPaths';

export const cards = [
    { id: 1, title: 'Add Cars', description: 'Add New Car', src: appAssets.create, isRedirect: false, modalContent: <CreatingPage /> },
    {
        id: 3,
        title: 'All Cars',
        description: 'Cars Update or Delete',
        src: appAssets.update,
        isRedirect: true,
        path: appPaths.update,
        modalContent: <UpdatingPage />,
    },
];
