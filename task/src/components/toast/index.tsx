import React from 'react';

// Define the types of toasts
type ToastType = 'success' | 'error' | 'info';

// Define the shape of each toast
interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastBarProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

const ToastBar = ({ toasts, removeToast }: ToastBarProps) => {
    return (
        <div className="fixed top-10 right-2 z-50 ">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`p-2 mt-1 rounded-md text-bg ${toast.type === 'success' ? 'bg-text' : 'bg-red-500'}`}
                    onClick={() => removeToast(toast.id)}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
};

export default ToastBar;
