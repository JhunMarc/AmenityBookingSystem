import { useBooking } from '../context/BookingContext';
import { Clock8 } from 'lucide-react';
import { clsx } from 'clsx';

export const SlotGrid = () => {
    const { slots, selectedSlotId, selectSlot, isLoading } = useBooking();

    if (isLoading) return <div className="py-10 text-center text-gray-500">Loading availability...</div>;
    if (slots.length === 0) return <div className="py-10 text-center text-gray-500">No slots available.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {slots.map(slot => {
                const startTime = slot.startTime.substring(0, 5); 
                const endTime = slot.endTime.substring(0, 5); 
 
                const baseClasses = "flex items-center gap-2 px-1 py-1 rounded-md border text-left transition-all";
                let stateClasses = "bg-[#D4EFCD] border-[#88DE74] text-black hover:bg-green-200"; 
                let label = "Available";
                
                if (slot.isBooked) {
                    stateClasses = "bg-[#D1D1D1] border-[#CAC6C6] text-[#8C8C8C] cursor-not-allowed";
                    label = "Not Available";
                } else if (selectedSlotId === slot.id) {
                    stateClasses = "bg-[#B9E1FF] border-[#ECF7FF] text-black ring-sky-500";
                    label = "Selected";
                }

                return (
                    <button
                        key={slot.id}
                        disabled={slot.isBooked}
                        onClick={() => selectSlot(slot.id)}
                        className={clsx(baseClasses, stateClasses)}
                    >
                        <div className={clsx("text-xl font-light  border-r px-2",
                            slot.isBooked ? "text-[#B8B8B8] border-r border-gray-400 border-solid" : selectedSlotId === slot.id ? "text-[#355E7C] border-r border-sky-300 border-solid" : "text-[#355E7C] border-r border-gray-400 border-solid"
                        )}>S1</div>
                        <div className=''>
                            <span className={clsx("text-[10px] font-thin px-2 py-0.5 rounded-xl", 
                                slot.isBooked ? "bg-[#C0C0C0]" : selectedSlotId === slot.id ? "bg-[#3DAECE] text-white" : "bg-[#56B23F] text-white"
                            )}>
                                {label}
                            </span>
                            <div className="text-[10px] lg:text-[11px] mt-1 flex items-center font-medium ">
                                <Clock8 size={12} className="mr-1 flex-shrink-0 opacity-70 " /> 
                                <span>{startTime} AM to {endTime} AM</span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};