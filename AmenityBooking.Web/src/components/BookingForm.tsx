import { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { format, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Film, Music, Dumbbell, Wind, TreePine, Activity,CheckCircle, XCircle } from 'lucide-react';
import { SlotGrid } from './SlotGrid';
import { useUser } from '../context/UserContext';
import { NotificationModal } from './NotificationModal';

const iconMap: Record<string, any> = {
    film: Film, music: Music, dumbbell: Dumbbell, wind: Wind, tree: TreePine, activity: Activity
};

export const BookingForm = () => {
    const { selectedAmenity, selectedDate, selectDate, selectedSlotId, submitBooking } = useBooking();
    const [headCount, setHeadCount] = useState(0);
    const [agreed, setAgreed] = useState(false);
    const [eventName, setEventName] = useState("");
    const { userName } = useUser();
    const isFormValid = eventName !== "" && headCount > 0 && selectedSlotId && agreed;
    const todayString = format(new Date(), 'yyyy-MM-dd');

    const [modalState, setModalState] = useState<{ isOpen: boolean, type: 'success' | 'error', message: string }>({
        isOpen: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        setHeadCount(0);
        setEventName(""); 
        setAgreed(false);
    }, [selectedAmenity]);
    const handleSelectDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);

        if (selected < today) {
            // alert("cant select past date");
            return;
        }

        selectDate(date);
    };

    const handleBooking = async () => {
        if (!userName) return;
        const success = await submitBooking(userName, headCount, eventName);
        // alert(`Booking Confirmed for ${userName}!`);

        if (success) {
            setModalState({ isOpen: true, type: 'success', message: `Booking successfully confirmed for ${userName}!` });

            setHeadCount(0);
            setEventName("");
            setAgreed(false);
        } else {
            setModalState({ isOpen: true, type: 'error', message: 'This slot was just booked by another user.' });
        }
    };


    if (!selectedAmenity) return null;
    const Icon = iconMap[selectedAmenity.icon];
    
    return (
        <>
        <NotificationModal 
            isOpen={modalState.isOpen}
            type={modalState.type}
            message={modalState.message}
            onClose={() => setModalState({ ...modalState, isOpen: false })}
        />
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mt-6">
            <div className="bg-[#1a1a1a] text-white px-6 py-4 flex items-center gap-3">
                <span className="opacity-70">
                     <Icon size={16} />
                </span>
                <h3 className="font-medium text-lg tracking-wide">
                    {selectedAmenity.name} <span className="opacity-50">({selectedAmenity.type})</span>
                </h3>
            </div>
            
            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6 border-r border-gray-100">
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        <div>
                            <label className="text-xs font-bold text-gray-700 block mb-2">Booking for Event?</label>
                            <select className="w-full border rounded-md p-2.5 text-sm bg-white" value={eventName} onChange={e => setEventName(e.target.value)}>
                                <option value="" disabled hidden>Select...</option>
                                <option>No</option>
                                <option>Yes</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs font-bold text-gray-700 block mb-2">People</label>
                                <div className="flex items-center justify-between border rounded-md p-2">
                                    <button className='rounded-full w-8 h-8 bg-black text-white' onClick={() => setHeadCount(Math.max(1, headCount - 1))}>-</button>
                                    <input
                                    type="number"
                                    min={0}
                                    value={headCount}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        if (!isNaN(value) && value >= 1) {
                                        setHeadCount(value);
                                        } else if (e.target.value === "") {
                                        // handle empty case
                                        setHeadCount(1);
                                        }
                                    }}
                                    className="text-center border-none focus:outline-none"
                                    />
                                    <button className='rounded-full w-8 h-8 bg-black text-white' onClick={() => setHeadCount(headCount + 1)}>+</button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-bold text-gray-700 block mb-2">Date</label>
                                <input type="date" className="w-full border rounded-md p-2 text-sm" 
                                    value={format(selectedDate, 'yyyy-MM-dd')}
                                    onChange={(e) => handleSelectDate(new Date(e.target.value))}
                                    min={todayString}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 text-sm">Select your Preference</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleSelectDate(addDays(selectedDate, -1))}><ChevronLeft size={16}/></button>
                            <span className="text-sm font-bold">{format(selectedDate, 'dd MMM yyyy')}</span>
                            <button onClick={() => selectDate(addDays(selectedDate, 1))}><ChevronRight size={16}/></button>
                        </div>
                    </div>

                    <SlotGrid />

                    <div className="mt-6 pt-2">
                        <div className="flex items-center gap-2 mb-4">
                            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="rounded" />
                            <span className="text-sm text-gray-600">I agree to Terms & Conditions</span>
                        </div>
                        <button 
                            disabled={!isFormValid}
                            onClick={handleBooking}
                            className="w-full bg-gray-900 text-white py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>

                <div className='w-5/12 p-6'>
                    <div className="bg-gray-50 p-6 text-sm text-gray-600 rounded-lg">
                        <h2 className="text-lg mb-4">Terms & Conditions</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>
                                Operating Hours: 06 AM to 10 PM.
                            </li>
                            <li>
                                Shutdown for Floor Cleaning: 2:00 PM to 3:00 PM.
                                <p className="mt-2">
                                    Please note that the facility will undergo floor cleaning during this time. We kindly ask all members to plan their visits accordingly.
                                </p>
                            </li>
                            <li>
                                Access Restrictions:
                                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                                    <li>
                                        Outsiders: Only registered members are permitted access to the facility.
                                    </li>
                                    <li>
                                        Pets: For the safety and comfort of all members, pets are not allowed within the premises.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Barcode Access: All members are required to use their barcode for entry. Please ensure your barcode is scanned upon arrival.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};