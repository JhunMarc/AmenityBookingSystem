import { useState } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext'; 

export const Header = () => {
    const { userName, logout } = useUser();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const initials = userName ? userName.substring(0, 2).toUpperCase() : "GU";
 
    return (
        <header className="h-20 bg-white px-4 md:px-8 flex items-center justify-between shadow-sm sticky top-0 z-40">
            <div className='w-full max-w-6xl mx-auto flex flex-row justify-between items-center'>
                <div className="flex items-center gap-4">
                    <img src="/oro.png" alt="ORO24" className="h-8 md:h-12" />
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <button className="relative text-gray-500 hover:text-black">
                        <Bell size={24} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 hover:bg-gray-50 p-1 rounded-lg transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm"
                                style={{ background: 'linear-gradient(to bottom, #3DAECE, #EDBB70)',}}
                            >
                                {initials}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900 leading-none">{userName || "Guest"}</p>
                            </div>
                            <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-50">
                                <button 
                                    onClick={logout}
                                    className="flex items-center gap-2 text-red-500 text-sm px-4 py-2 w-full hover:bg-red-50"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>      
        </header>
    );
};