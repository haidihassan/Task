'use client';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const CarsForm = () => {
    const [formData, setFormData] = useState({
        brand: '',
        type: '',
        model: '',
        year: '',
        img: '',
        engine: '',
        price: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        // Add API call here if needed
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-gray-200 rounded-lg">
            <div>
                <label htmlFor="brand" style={{ alignItems: 'flex-start' }}>
                    Brand:
                </label>
                <Input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                </select>
            </div>
            <div>
                <label htmlFor="model">Model:</label>
                <Input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="year">Year:</label>
                <Input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="img">Image URL:</label>
                <Input type="url" id="img" name="img" value={formData.img} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="engine">Engine:</label>
                <Input type="text" id="engine" name="engine" value={formData.engine} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default CarsForm;
