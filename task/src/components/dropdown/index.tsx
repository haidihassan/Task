import { appIcons } from '@/constants/appIcons';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

interface CustomDropdownProps {
    label?: string;
    options: string[];
    selectedValue: string;
    placeholder: string;
    onChange: (value: string) => void;
    error?: string; // Optional error prop
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    options,
    selectedValue,
    placeholder,
    onChange,
    error,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSelect = (value: string) => {
        onChange(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            {label && <label className="block mb-2">{label}</label>}
            <div
                className={`cursor-pointer p-2 border ${error ? 'border-red-500' : 'border-gray-200'} rounded flex justify-between items-center`}
                onClick={toggleDropdown}
            >
                <span className={selectedValue ? 'text-black' : 'text-gray-500'}>
                    {selectedValue || placeholder}
                </span>
                <Icon icon={isDropdownOpen ? appIcons.uparrow : appIcons.downarrow} width={16} className='text-text' />
            </div>
            {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-bg border border-gray-200 rounded shadow-lg z-10">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-100 border-b border-gray-200 cursor-pointer text-left"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500 mt-1 text-left">{error}</p>} {/* Display error message */}
        </div>
    );
};

export default CustomDropdown;