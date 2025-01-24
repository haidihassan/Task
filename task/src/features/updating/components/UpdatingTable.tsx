'use client';
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Tableheads } from '../constants/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { appIcons } from '@/constants/appIcons';
import useFetchData from '@/hooks/useFetchData';
import PopUp from '@/components/popup';
import useToast from '@/hooks/useToast';
import { DeleteItem } from '../../deleting/utils/DeleteItem';
import SearchComponent from '@/components/search';
import EditForm from './EditForm';
import { EditItem } from '../utils/EditItem';
import Button from '@/components/buttons';
import { useRouter } from 'next/navigation';

export default function UpdatingTable() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error('API URL is not defined in the environment variables.');
    }
    const { data: carsData, loading, error } = useFetchData<any[]>(apiUrl);
    const { addToast } = useToast();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchValue('');
    };

    const handleDeleteClick = (item: any) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);

        try {
            await DeleteItem(itemToDelete.id);
            addToast('Item deleted successfully!', 'success');
            setIsModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            addToast('Failed to delete item.', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };
    const handleEditClick = (item: any) => {
        setSelectedItem(item);
        setIsEditMode(true);
    };
    const filteredData = carsData?.filter((item) => {
        return Tableheads.some((header) => {
            const value = item[header.key];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
        });
    });
    const handleSaveEdit = async (updatedData: any) => {
        try {
            await EditItem(selectedItem.id, updatedData);
            addToast('Item updated successfully!', 'success');
            setIsEditMode(false);
            setSelectedItem(null);
        } catch (error) {
            addToast('Failed to update item.', 'error');
        }
    };
    const handleCancelEdit = () => {
        setIsEditMode(false);
        setSelectedItem(null);
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center min-h-screen px-4">
                <div className="flex-1">
                    <SearchComponent
                        placeholder="Search for items..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onClear={handleClearSearch}
                        icon={<Icon icon={appIcons.search} width={25} />}
                    />
                </div>
                <div className="ml-4 " style={{ marginBottom: '20px' }}>
                    <Button
                        label="Go back"
                        style={{ backgroundColor: '#6e5ea3' }}
                        size="large"
                        variant="outline"
                        borderRadius="medium"
                        onClick={() => router.back()}
                        icon={<Icon icon={appIcons.back} width={20} />}
                        iconPosition="left"
                    />
                </div>
            </div>
            <Table className="min-w-full mt-4">
                <TableHeader>
                    <TableRow>
                        {Tableheads.map((header) => (
                            <TableCell key={header.key} className={`p-4 border ${header.align ? `text-${header.align}` : ''}`}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-100vh overflow-y-auto">
                    {filteredData?.map((row, index) => (
                        <TableRow key={index}>
                            {Tableheads.map((header) => (
                                <TableCell key={header.key} className={`p-4 border ${header.align ? `text-${header.align}` : ''}`}>
                                    {header.key === 'img' ? (
                                        <img src={row[header.key]} alt={row.brand} className="w-16 h-16 object-cover" />
                                    ) : header.key === 'Actions' ? (
                                        <div className="flex space-x-5 items-center">
                                            <Icon
                                                icon={appIcons.edit}
                                                width={20}
                                                onClick={() => handleEditClick(row)}
                                                className="cursor-pointer"
                                            />
                                            <Icon
                                                icon={appIcons.delete}
                                                width={20}
                                                onClick={() => handleDeleteClick(row)}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    ) : (
                                        row[header.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {filteredData?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={Tableheads.length} className="text-center p-4">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {isEditMode && <EditForm item={selectedItem} onSave={handleSaveEdit} onCancel={handleCancelEdit} />}
            <PopUp
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                itemName={itemToDelete?.title || 'item'}
            />
        </div>
    );
}
