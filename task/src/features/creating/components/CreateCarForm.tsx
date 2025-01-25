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
import { z } from 'zod';
import { CarFormSchema } from '../validations/CarSchema';

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

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function validateForm(): boolean {
        try {
            CarFormSchema.parse(formData);
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = err.errors.reduce((acc: FormErrors, error) => {
                    const fieldName = error.path[0] as keyof FormErrors;
                    acc[fieldName] = error.message;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            }
            return false;
        }
    }

    function handleDropdownChange(value: string) {
        setFormData((prev) => ({ ...prev, type: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
                        error={errors.brand}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <CustomDropdown
                        placeholder="Type"
                        options={carTypes}
                        selectedValue={formData.type}
                        onChange={handleDropdownChange}
                        error={errors.type}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                        error={errors.model}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleChange}
                        error={errors.year}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="url"
                        id="img"
                        name="img"
                        placeholder="Image URL"
                        value={formData.img}
                        onChange={handleChange}
                        error={errors.img}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Input
                        type="text"
                        id="engine"
                        name="engine"
                        placeholder="Engine"
                        value={formData.engine}
                        onChange={handleChange}
                        error={errors.engine}
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
                        error={errors.price}
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
