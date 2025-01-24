'use client';
import CustomDropdown from '@/components/dropdown';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { carTypes } from '../constants/constants';
import Button from '@/components/buttons';
import ToastBar from '@/components/toast';
import useToast from '@/hooks/useToast';
import { CarService } from '../utils/CarService';
import { appPaths } from '@/constants/appPaths';
import { Icon } from '@iconify/react/dist/iconify.js';
import { appIcons } from '@/constants/appIcons';

export default function CarsForm() {
    const { toasts, addToast, removeToast } = useToast();
    const router = useRouter();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (value: string) => {
        setFormData((prev) => ({ ...prev, type: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        const result = await CarService(formData);

        if (result.success) {
            addToast('Car Created successfully', 'success');
            router.push(appPaths.update);
        } else {
            addToast(`An error occurred: ${result.error}`, 'error');
        }

        setIsSubmitting(false);
    };

    return (
        <form className="p-4 border border-gray-200 rounded-lg" onSubmit={handleSubmit}>
            <div className="space-y-4 text-black">
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

                <Button
                    label={isSubmitting ? 'Submitting...' : 'Submit'}
                    style={{ backgroundColor: '#18538c' }}
                    size="default"
                    variant="outline"
                    borderRadius="medium"
                    type="submit"
                    icon={<Icon icon={appIcons.submit} width={20} />}
                    iconPosition="right"
                />
                <ToastBar toasts={toasts} removeToast={removeToast} />
            </div>
        </form>
    );
}
