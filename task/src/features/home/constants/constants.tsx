import { appAssets } from '@/constants/appAssets';
import CreatingPage from '@/app/creating/page';
import ReadingPage from '@/app/reading/page';
import UpdatingPage from '@/app/updating/page';
import DeletePage from '@/app/deleting/page';

export const cards = [
    { id: 1, title: 'Create', description: 'Create New API', src: appAssets.create, content: <CreatingPage /> },
    { id: 2, title: 'Read', description: 'Only Read', src: appAssets.read, content: <ReadingPage /> },
    { id: 3, title: 'Update', description: 'Update API', src: appAssets.update, content: <UpdatingPage /> },
    { id: 4, title: 'Delete', description: 'Delete API', src: appAssets.delete, content: <DeletePage /> },
];
