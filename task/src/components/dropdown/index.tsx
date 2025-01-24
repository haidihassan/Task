import { appIcons } from '@/constants/appIcons';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

interface CustomDropdownProps {
    label?: string;
    options: string[];
    selectedValue: string;
    placeholder: string;
    onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, options, selectedValue, placeholder, onChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelect = (value: string) => {
        onChange(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            {label && <label className="block mb-2">{label}</label>} {/* Conditionally render label */}
            <div className="cursor-pointer p-2 border border-gray-200 rounded flex justify-between items-center" onClick={toggleDropdown}>
                <span className={selectedValue ? 'text-black' : 'text-gray-500'}>
                    {selectedValue || placeholder} {/* If no selected value, show placeholder */}
                </span>
                <Icon icon={isDropdownOpen ? appIcons.uparrow : appIcons.downarrow} width={16} color="#18538c" />
            </div>
            {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-100  border-b-2  border-gray-200 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
