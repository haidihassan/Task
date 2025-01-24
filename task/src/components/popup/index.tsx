import React from 'react';
import Button from '../buttons';
import { TextAnimate } from '../ui/text-animate';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmStyle?: React.CSSProperties;
    cancelStyle?: React.CSSProperties;
    children?: React.ReactNode; // Add children to props
}

const PopUp: React.FC<PopUpProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = '',
    description = '',
    confirmLabel,
    cancelLabel,
    confirmStyle,
    cancelStyle,
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#c8d5ef] p-6 rounded-md shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-center">
                    <TextAnimate animation="blurInUp" by="character">
                        {title}
                    </TextAnimate>
                </h3>
                <h4 className="text-[#18538c] text-xl font-bold text-center mb-6">{description}</h4>

                <div className="mb-6">{children}</div>

                {(confirmLabel || cancelLabel) && (
                    <div className="flex justify-center gap-4">
                        {cancelLabel && (
                            <Button
                                label={cancelLabel}
                                onClick={onClose}
                                size="medium"
                                style={cancelStyle || { backgroundColor: '#18538c', color: '#fff' }}
                                variant="outline"
                                borderRadius="medium"
                            />
                        )}
                        {confirmLabel && (
                            <Button
                                label={confirmLabel}
                                onClick={onConfirm}
                                size="medium"
                                style={confirmStyle || { backgroundColor: '#d9534f', color: '#fff' }}
                                variant="solid"
                                borderRadius="medium"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopUp;
