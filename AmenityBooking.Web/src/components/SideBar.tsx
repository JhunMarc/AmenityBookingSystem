import { LayoutDashboard, Home, UploadCloud, Calendar, Key, Armchair } from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: Home, label: "Unit Detail", active: false },
    { icon: UploadCloud, label: "Uploads", active: false },
    { icon: Calendar, label: "Appointment", active: false },
    { icon: Key, label: "Handover", active: false },
    { icon: Armchair, label: "Amenity Booking", active: true },
];

export const Sidebar = () => {
    return (
        <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm p-4 ">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={clsx(
                                "w-full flex items-center gap-4 px-4 py-4 rounded-lg text-sm font-medium transition-colors",
                                item.active 
                                    ? "text-black font-bold bg-gray-50" 
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};