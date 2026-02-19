import { useBooking } from '../context/BookingContext';
import { clsx } from 'clsx';

export const SlotGrid = () => {
    const { slots, selectedSlotId, selectSlot, isLoading } = useBooking();

    if (isLoading) return <div className="py-10 text-center text-gray-500">Loading availability...</div>;
    if (slots.length === 0) return <div className="py-10 text-center text-gray-500">No slots available.</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
            {slots.map(slot => {
                const startTime = slot.startTime.substring(0, 5); 
                const endTime = slot.endTime.substring(0, 5); 
 
                const baseClasses = "flex items-center gap-3 p-3 rounded-lg border text-left transition-all";
                let stateClasses = "bg-green-100 border-green-300 text-green-900 hover:bg-green-200"; 
                let label = "Available";
                
                if (slot.isBooked) {
                    stateClasses = "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed";
                    label = "Not Available";
                } else if (selectedSlotId === slot.id) {
                    stateClasses = "bg-sky-100 border-sky-300 text-sky-800 ring-2 ring-sky-500";
                    label = "Selected";
                }

                return (
                    <button
                        key={slot.id}
                        disabled={slot.isBooked}
                        onClick={() => selectSlot(slot.id)}
                        className={clsx(baseClasses, stateClasses)}
                    >
                        <div className="text-2xl font-light opacity-50">S1</div>
                        <div>
                            <span className={clsx("text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-xl", 
                                slot.isBooked ? "bg-gray-200" : selectedSlotId === slot.id ? "bg-sky-400 text-white" : "bg-green-400 text-white"
                            )}>
                                {label}
                            </span>
                            <div className="text-xs mt-1">{startTime} - {endTime}</div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};