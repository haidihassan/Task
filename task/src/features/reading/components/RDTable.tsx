'use client';
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Tableheads } from '../../updating/constants/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { appIcons } from '@/constants/appIcons';
import useFetchData from '@/features/reading/hooks/useFetchData';
import PopUp from '@/components/popup';
import useToast from '@/hooks/useToast';
import { DeleteItem } from '../../deleting/utils/DeleteItem';
import SearchComponent from '@/components/search';
import EditCarForm from '../../updating/components/EditCarForm';
import { EditItem } from '../../updating/utils/EditItem';
import Button from '@/components/buttons';
import { useRouter } from 'next/navigation';

export default function RDTable() {
    const { data: carsData, loading, error } = useFetchData<any[]>();
    const { addToast } = useToast();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);
    const handleClearSearch = () => setSearchValue('');

    const handleDeleteClick = (item: any) => {
        setItemToDelete(item);
        setModalType('delete');
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);

        const result = await DeleteItem(itemToDelete.id);

        if (result.success) {
            addToast('Item deleted successfully!', 'success');
            setIsModalOpen(false);
            setItemToDelete(null);
        } else {
            addToast('Failed to delete item. Please try again.', 'error');
        }
        setIsDeleting(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
        setSelectedItem(null);
        setModalType(null);
    };

    const handleEditClick = (item: any) => {
        setSelectedItem(item);
        setModalType('edit');
        setIsModalOpen(true);
    };

    const filteredData = carsData?.filter((item) =>
        Tableheads.some((header) =>
            typeof item[header.key] === 'string' ? item[header.key].toLowerCase().includes(searchValue.toLowerCase()) : false
        )
    );

    const handleSaveEdit = async (updatedData: any) => {
        try {
            await EditItem(selectedItem.id, updatedData);
            addToast('Item updated successfully!', 'success');
            setIsModalOpen(false);
            setSelectedItem(null);
        } catch (error) {
            addToast('Failed to update item.', 'error');
        }
    };

    const handleCancelEdit = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    if (loading) return <div className="text-text">Loading...</div>;
    if (error) return <div className="text-text">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center min-h-screen px-5" style={{ marginBottom: '20px' }}>
                <div className="flex-1">
                    <SearchComponent
                        placeholder="Search for items..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onClear={handleClearSearch}
                        icon={<Icon icon={appIcons.search} width={25} color="#18538c" />}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button
                        label="Go back"
                        style={{ backgroundColor: '#18538c' }}
                        size="large"
                        variant="outline"
                        borderRadius="medium"
                        onClick={() => router.back()}
                        icon={<Icon icon={appIcons.back} width={20} />}
                        iconPosition="left"
                    />
                </div>
            </div>

            <Table className="min-w-full mt-4 text-white">
                <TableHeader>
                    <TableRow>
                        {Tableheads.map((header) => (
                            <TableCell key={header.key} className={`p-4 ${header.align ? `text-${header.align}` : ''}`}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-100vh overflow-y-auto">
                    {filteredData?.map((row, index) => (
                        <TableRow key={index}>
                            {Tableheads.map((header) => (
                                <TableCell key={header.key} className={`p-4 ${header.align ? `text-${header.align}` : ''}`}>
                                    {header.key === 'img' ? (
                                        <img src={row[header.key]} alt={row.brand} className="w-16 h-16 object-cover" />
                                    ) : header.key === 'Actions' ? (
                                        <div className="flex space-x-10 items-center">
                                            <Icon
                                                icon={appIcons.edit}
                                                color="#18538c"
                                                width={20}
                                                onClick={() => handleEditClick(row)}
                                                className="cursor-pointer"
                                            />
                                            <Icon
                                                icon={appIcons.delete}
                                                color="#18538c"
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

            {isModalOpen && modalType === 'edit' && selectedItem && (
                <PopUp isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={() => {}} description="Edit Car">
                    <EditCarForm item={selectedItem} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
                </PopUp>
            )}

            {isModalOpen && modalType === 'delete' && itemToDelete && (
                <PopUp
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    title="Are You Sure You Want to Delete?"
                    confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
                    cancelLabel="Cancel"
                    confirmStyle={{ backgroundColor: '#18538c', color: 'white' }}
                    cancelStyle={{ backgroundColor: '#18538c', color: 'white' }}
                />
            )}
        </div>
    );
}
