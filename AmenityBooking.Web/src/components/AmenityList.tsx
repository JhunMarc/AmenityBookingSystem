import { useBooking } from '../context/BookingContext';
import { Film, Music, Dumbbell, Wind, TreePine, Activity } from 'lucide-react';
import { clsx } from 'clsx';

const iconMap: Record<string, any> = {
    film: Film, music: Music, dumbbell: Dumbbell, wind: Wind, tree: TreePine, activity: Activity
};

export const AmenityList = () => {
    const { amenities, selectedAmenity, selectAmenity } = useBooking();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {amenities.map(item => {
                const Icon = iconMap[item.icon] || Film;
                const isSelected = selectedAmenity?.id === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => selectAmenity(item)}
                        className={clsx(
                            "flex items-center p-4 rounded-xl border transition-all w-full",
                            isSelected ? "bg-[#221F20] text-white border-black shadow-lg" : "bg-white border-gray-200 text-black"
                        )}
                    >
                        <div className={clsx(
                            "flex shrink-0 items-center justify-center w-9 h-9 rounded-full",
                            isSelected ? "border-2 border-white" : "border-2 border-[#D4A267]"
                        )}>
                            <Icon size={16} />
                        </div>
                        <div className="ml-3 text-left overflow-hidden">
                            <div className={clsx("text-xs  truncate",
                            isSelected ? " " : "font-bold")}>{item.name}</div>
                            <div className={clsx("text-xs  truncate",
                            isSelected ? " " : "opacity-60")}>{"("+ item.type + ")"}</div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};