import { appIcons } from '@/constants/appIcons';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

interface SearchComponentProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    icon: React.ReactNode; // Icon to display inside the input field
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder = 'Search...', value, onChange, onClear, icon }) => {
    return (
        <div className="relative flex items-center w-full mb-8 mt-3 max-w-md">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="py-2 pl-10 pr-10 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-text focus:border-text"
            />
            {/* Icon inside the input */}
            <div className="absolute left-3 text-gray-400 pointer-events-none">{icon}</div>
            {/* Clear button */}
            {value && (
                <button type="button" onClick={onClear} className="right-0 -ml-8 text-gray-400 hover:text-gray-600">
                    <Icon icon={appIcons.close} width={25} className="text-text-color" />
                </button>
            )}
        </div>
    );
};

export default SearchComponent;
