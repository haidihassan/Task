import React from 'react';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
                <h2 className="text-xl">Are You Sure You Want Delete?</h2>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="mr-4 text-red-500">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="text-green-500">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
