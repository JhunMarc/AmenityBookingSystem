import { Home, CalendarDays, HandHeart, Boxes, Building, Cpu } from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: Building, label: "Unit Detail", active: false },
    { icon: Cpu, label: "Uploads", active: false },
    { icon: CalendarDays, label: "Appointment", active: false },
    { icon: HandHeart, label: "Handover", active: false },
    { icon: Boxes, label: "Amenity Booking", active: true },
];

export const Sidebar = ({ isMobile }: { isMobile?: boolean }) => {
    return (
        <div className={clsx(" flex-shrink-0", !isMobile && "hidden lg:block")}>
            
            <div className="bg-white rounded-lg shadow-sm px-2 py-2">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={clsx(
                                "w-full flex items-center px-4 py-4 rounded-lg text-sm transition-colors",
                                item.active 
                                    ? "text-[#000000] font-bold gap-4" 
                                    : "text-[#696969] hover:text-gray-600 hover:bg-gray-50 gap-[10px] gap-[10px]"
                            )}
                        >
                            <item.icon size={20} strokeWidth={item.active ? 1.7 : 1.5} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
        
    );
};