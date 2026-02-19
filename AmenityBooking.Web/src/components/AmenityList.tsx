import { useBooking } from '../context/BookingContext';
import { Film, Music, Dumbbell, Wind, TreePine, Activity } from 'lucide-react';
import { clsx } from 'clsx';

const iconMap: Record<string, any> = {
    film: Film, music: Music, dumbbell: Dumbbell, wind: Wind, tree: TreePine, activity: Activity
};

export const AmenityList = () => {
    const { amenities, selectedAmenity, selectAmenity } = useBooking();

    return (
        <div className="flex flex-wrap gap-4 pb-4 mb-6">
            {amenities.map(item => {
                const Icon = iconMap[item.icon] || Film;
                const isSelected = selectedAmenity?.id === item.id;

                return (
                <button
                    key={item.id}
                    onClick={() => selectAmenity(item)}
                    className={clsx(
                    "flex items-center px-4 py-3 rounded-xl border transition-all w-[23%]",
                    isSelected ? "bg-black text-white border-black shadow-lg" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                    )}
                >
                    <div
                    className={clsx(
                        "flex items-center justify-center w-12 h-12 rounded-full",
                        isSelected ? "border border-white text-white" : "border-2 border-solid border-[#B18A09] text-gray-600 "
                    )}
                    >
                        <Icon size={16} />
                    </div>
                    <div className="ml-3 w-20 flex flex-col justify-center">
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.type}</div>
                    </div>
                </button>
                );
            })}
        </div>
    );
};