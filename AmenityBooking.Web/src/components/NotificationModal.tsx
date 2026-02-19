import React from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { clsx } from 'clsx';

interface NotificationModalProps {
    isOpen: boolean;
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, type, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className={clsx("h-2 w-full", type === 'success' ? "bg-green-500" : "bg-red-500")} />
                <div className="p-6 flex flex-col items-center text-center">
                    <div className={clsx("mb-4 p-3 rounded-full", type === 'success' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                        {type === 'success' ? <CheckCircle size={32} /> : <XCircle size={32} />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {type === 'success' ? 'Booking Successful' : 'Booking Failed'}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                        {message}
                    </p>
                    <button 
                        onClick={onClose}
                        className={clsx(
                            "w-full py-2.5 rounded-lg font-medium text-white transition-colors",
                            type === 'success' ? "bg-gray-900 hover:bg-black" : "bg-red-500 hover:bg-red-600"
                        )}
                    >
                        {type === 'success' ? 'Done' : 'Try Again'}
                    </button>
                </div>
            </div>
        </div>
    );
};