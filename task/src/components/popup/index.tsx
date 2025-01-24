import React from 'react';
import Button from '../buttons';
import { TextAnimate } from '../ui/text-animate';
import TypingAnimation from '../ui/typing-animation';

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
            <div className="bg-white p-10 rounded-md">
                <h2 className="text-xl">
                    <TextAnimate animation="blurInUp" by="character" style={{ fontSize: '17px' }}>
                        Are You Sure You Want Delete?
                    </TextAnimate>
                </h2>
                <div className="mt-4 flex justify-end">
                    <div className="flex justify-center gap-4 mx-auto">
                        <Button
                            label="Cancel"
                            onClick={onClose}
                            size="medium"
                            style={{ backgroundColor: '#18538c' }}
                            variant="outline"
                            borderRadius="medium"
                        />
                        <Button
                            label="Delete"
                            onClick={onConfirm}
                            size="medium"
                            style={{ backgroundColor: '#18538c' }}
                            variant="outline"
                            borderRadius="medium"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
