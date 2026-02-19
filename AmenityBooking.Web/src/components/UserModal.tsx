import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

export const UserModal = () => {
    const { userName, setUserName } = useUser();
    const [input, setInput] = useState(''); 
    const [error, setError] = useState('');

    if (userName) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        setError(''); // Reset error on change
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = input.trim();

        if (trimmed.length < 2) {
            setError('Name must be at least 2 characters long.');
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(trimmed)) {
            setError('Name can only contain letters and spaces.');
            return;
        }

        setUserName(trimmed);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
                <h2 className="text-2xl font-black mb-2">Welcome to ORO24</h2>
                <p className="text-gray-500 mb-6">Please enter your name to continue booking.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                            value={input}
                            onChange={handleChange}
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={!input.trim()}
                        className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                        Start Booking
                    </button>
                </form>
            </div>
        </div>
    );
};  