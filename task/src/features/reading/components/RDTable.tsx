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
import Pagination from '@/components/pagination';

export default function RDTable() {
    const { data: carsData, loading, error, refetch } = useFetchData<any[]>();
    const { addToast } = useToast();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 2;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);
    const handleClearSearch = () => setSearchValue('');

    const filteredData = carsData?.filter((item) =>
        Tableheads.some((header) =>
            typeof item[header.key] === 'string' ? item[header.key].toLowerCase().includes(searchValue.toLowerCase()) : false
        )
    );

    const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
    const currentData = filteredData?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
            refetch();
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

    const handleSaveEdit = async (updatedData: any) => {
        try {
            await EditItem(selectedItem.id, updatedData);
            addToast('Item updated successfully!', 'success');
            refetch();
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
                <SearchComponent
                    placeholder="Search for items..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    onClear={handleClearSearch}
                    icon={<Icon icon={appIcons.search} width={25} color="#18538c" />}
                />
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
                    {currentData?.map((row, index) => (
                        <TableRow key={index}>
                            {Tableheads.map((header) => (
                                <TableCell key={header.key} className={`p-4 ${header.align ? `text-${header.align}` : ''}`}>
                                    {header.key === 'img' ? (
                                        <img src={row[header.key]} alt={row.brand} className="w-16 h-16 object-cover" />
                                    ) : header.key === 'Actions' ? (
                                        <div className="flex space-x-10 items-center">
                                            <Icon
                                                icon={appIcons.edit}
                                                width={20}
                                                onClick={() => handleEditClick(row)}
                                                className="cursor-pointer text-text"
                                            />
                                            <Icon
                                                icon={appIcons.delete}
                                                width={20}
                                                onClick={() => handleDeleteClick(row)}
                                                className="cursor-pointer text-text"
                                            />
                                        </div>
                                    ) : (
                                        row[header.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {currentData?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={Tableheads.length} className="text-center p-4">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}>
                    {/* <div className="text-center mt-2 text-gray-600">More items on the next page</div> */}
                </Pagination>
            )}
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
