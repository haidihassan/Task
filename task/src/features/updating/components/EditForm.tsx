import CustomDropdown from '@/components/dropdown';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/buttons';
import ToastBar from '@/components/toast';
import useToast from '@/hooks/useToast';
import { carTypes } from '@/features/creating/constants/constants';

interface EditFormProps {
    item: any;
    onSave: (updatedData: any) => Promise<void>;
    onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ onSave, onCancel }) => {
    const { toasts, removeToast } = useToast();
    // const router = useRouter();
    const id: string | string[] | undefined = useParams().id;
    const [formData, setFormData] = useState({
        brand: '',
        type: '',
        model: '',
        year: '',
        img: '',
        engine: '',
        price: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        // console.log("id:",id);
        const fetchData = async () => {
            if (id) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                    const response = await fetch(`${apiUrl}${id}`);
                    const data = await response.json();
                    setFormData({
                        brand: data.brand,
                        type: data.type,
                        model: data.model,
                        year: data.year,
                        img: data.img,
                        engine: data.engine,
                        price: data.price,
                    });
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (value: string) => {
        setFormData((prev) => ({ ...prev, type: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
        setIsSubmitting(true);

        // try {
        //     const result: { success: boolean; error: string } = await EditItem(id, formData);
        //     if (result.success) {
        //         addToast('Item edited successfully', 'success');
        //         console.log('Item edited successfully', result);
        //         setTimeout(() => {
        //             router.push(appPaths.update);
        //         }, 1000);
        //     } else {
        //         addToast(`An error occurred: ${result.error}`, 'error');
        //         console.log('error', result.error);
        //     }
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    return (
        <form className="p-4 border border-gray-200 rounded-lg max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="text"
                        id="brand"
                        placeholder="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <CustomDropdown placeholder="Type" options={carTypes} selectedValue={formData.type} onChange={handleDropdownChange} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input type="number" id="year" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input type="url" id="img" name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="text"
                        id="engine"
                        name="engine"
                        placeholder="Engine"
                        value={formData.engine}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-center gap-4">
                    <Button
                        label="Cancel"
                        style={{ backgroundColor: '#6e5ea3' }}
                        size="default"
                        variant="outline"
                        borderRadius="medium"
                        onClick={onCancel}
                    />
                    <Button
                        label={isSubmitting ? 'saving...' : 'Save'}
                        style={{ backgroundColor: '#6e5ea3' }}
                        size="default"
                        variant="outline"
                        borderRadius="medium"
                        type="submit"
                    />
                </div>
                <ToastBar toasts={toasts} removeToast={removeToast} />
            </div>
        </form>
    );
};

export default EditForm;
