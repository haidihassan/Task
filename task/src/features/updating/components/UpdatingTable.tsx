'use client';
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Tableheads } from '../constants/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { appIcons } from '@/constants/appIcons';
import useFetchData from '@/hooks/useFetchData';
import PopUp from '@/components/popup';
import useToast from '@/hooks/useToast';
import { DeleteItem } from '../utils/DeleteItem';

export default function UpdatingTable() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error('API URL is not defined in the environment variables.');
    }
    const { data: carsData, loading, error } = useFetchData<any[]>(apiUrl);
    const { toasts, addToast, removeToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        {Tableheads.map((header) => (
                            <TableCell key={header.key} className={`p-4 border ${header.align ? `text-${header.align}` : ''}`}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-[300px] overflow-y-auto">
                    {carsData?.map((row, index) => (
                        <TableRow key={index}>
                            {Tableheads.map((header) => (
                                <TableCell key={header.key} className={`p-4 border ${header.align ? `text-${header.align}` : ''}`}>
                                    {header.key === 'img' ? (
                                        <img src={row[header.key]} alt={row.brand} className="w-16 h-16 object-cover" />
                                    ) : header.key === 'Actions' ? (
                                        <div className="flex space-x-5 items-center">
                                            <Icon icon={appIcons.edit} width={20} className="cursor-pointer" />
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
                </TableBody>
            </Table>

            <PopUp
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                itemName={itemToDelete?.title || 'item'}
            />
        </div>
    );
}
