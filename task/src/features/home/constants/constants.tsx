import { appAssets } from '@/constants/appAssets';
import CreatingPage from '@/app/creating/page';
import ReadingPage from '@/app/reading/page';
import UpdatingPage from '@/app/updating/page';
import DeletePage from '@/app/deleting/page';
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
    // { id: 2, title: 'Read', description: 'Only Read', src: appAssets.read, modalContent: <ReadingPage /> },
    // { id: 4, title: 'Delete', description: 'Delete API', src: appAssets.delete, modalContent: <DeletePage /> },
];
