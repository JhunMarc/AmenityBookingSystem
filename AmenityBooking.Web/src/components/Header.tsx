import { Bell,LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext'; 

export const Header = () => {
    const { userName,logout } = useUser();
    const initials = userName ? userName.substring(0, 2).toUpperCase() : "GU";

    return (
        <header className=" h-20 bg-white px-8 flex items-center justify-between shadow-sm sticky top-0 z-40">
            <div className='w-10/12 mx-auto flex flex-row justify-between'>
                <div className="flex items-center">
                    <img src="/oro.png" alt="ORO24" className="h-13" />
                </div>
                <div className="flex items-center gap-6">
                    <button className="relative text-gray-500 hover:text-black">
                        <Bell size={24} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#cca352] text-white flex items-center justify-center font-bold text-sm">
                            {initials}
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-md  text-gray-900">{userName || "Guest"}</p>
                        </div>
                    </div>
                    <button 
                        onClick={logout}
                        className="flex items-center gap-2 text-red-500 text-sm p-2 w-full hover:bg-red-50 rounded-md"
                    >
                        <LogOut size={14} />
                    </button>

                </div>
            </div>      
        </header>
    );
};