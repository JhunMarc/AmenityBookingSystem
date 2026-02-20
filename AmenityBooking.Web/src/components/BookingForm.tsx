import { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { format, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Film, Music, Dumbbell, Wind, TreePine, Activity,MoveRight,ChevronDown } from 'lucide-react';
import { SlotGrid } from './SlotGrid';
import { useUser } from '../context/UserContext';
import { NotificationModal } from './NotificationModal';
import { Loader } from './Loader'; 
const iconMap: Record<string, any> = {
    film: Film, music: Music, dumbbell: Dumbbell, wind: Wind, tree: TreePine, activity: Activity
};

export const BookingForm = () => {
    
    const { isLoading ,selectedAmenity, selectedDate, selectDate, selectedSlotId, submitBooking } = useBooking();
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

    const isToday = format(selectedDate, 'yyyy-MM-dd') === todayString;
    if (!selectedAmenity) return null;
    const Icon = iconMap[selectedAmenity.icon];
    
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[600px] border mt-6">
            <NotificationModal 
                isOpen={modalState.isOpen}
                type={modalState.type}
                message={modalState.message}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
            />
            {isLoading ? (
            <Loader /> 
            ) : (
            <>
                <div className="bg-[#1a1a1a] text-white px-9 py-4 flex items-center gap-3">
                    <span className="opacity-70">
                        <Icon size={16} />
                    </span>
                    <h3 className="font-semibold text-lg tracking-wide">
                        {selectedAmenity.name} <span className="font-light">({selectedAmenity.type})</span>
                    </h3>
                </div>
                
                <div className="flex flex-col lg:flex-row"> 
                    <div className="flex-1 p-4 md:py-8 md:pl-8 border-gray-100">
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            <div>
                                <label className="text-xs font-thin text-black block mb-2 tracking-wider">
                                    Booking for Event?
                                </label>
                                <div className="relative w-full">
                                    <select 
                                        className="w-full border border-[#BABABA] rounded-md px-5 h-[50px] text-xs bg-white focus:ring-2 focus:ring-black outline-none appearance-none pr-8" 
                                        value={eventName} 
                                        onChange={e => setEventName(e.target.value)}
                                    >
                                        <option value="" disabled hidden>Select...</option>
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                                
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-thin text-black block mb-2 tracking-wider">
                                        Number of people
                                    </label>
                                    <div className="flex items-center justify-between border border-[#BABABA] rounded-md px-2 h-[50px] bg-white">
                                        <button 
                                            className='rounded-full w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors' 
                                            onClick={() => setHeadCount(Math.max(1, headCount - 1))}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min={1}
                                            value={headCount}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                setHeadCount(!isNaN(value) && value >= 1 ? value : 1);
                                            }}
                                            className="text-center border-none focus:outline-none w-12 text-sm font-medium"
                                        />
                                        <button 
                                            className='rounded-full w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors' 
                                            onClick={() => setHeadCount(headCount + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="text-xs font-thin text-black block mb-2 tracking-wider">
                                        Select Date
                                    </label>
                                    <input 
                                        type="date" 
                                        className="w-full border border-[#BABABA] rounded-md px-3 h-[50px] text-sm focus:ring-2 focus:ring-black outline-none" 
                                        value={format(selectedDate, 'yyyy-MM-dd')}
                                        onChange={(e) => handleSelectDate(new Date(e.target.value))}
                                        min={todayString}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[#454545] text-md font-normal">Select your preference</span>
                            <div className="flex items-center">
                                <button 
                                    className={`px-1 rounded-full w-6 h-6 transition-all ${
                                        isToday 
                                        ? 'bg-[#E3E3E3] text-white cursor-not-allowed' 
                                        : 'bg-[#3DAECE] hover:bg-[#55b6d1] hover:shadow-sm text-white'
                                    }`}
                                    onClick={() => !isToday && handleSelectDate(addDays(selectedDate, -1))}
                                    disabled={isToday}
                                >
                                    <ChevronLeft size={16}/>
                                </button>

                                <span className="text-sm font-normal px-3 min-w-[100px] text-center uppercase tracking-tight">
                                    {format(selectedDate, 'dd MMM yyyy')}
                                </span>

                                <button 
                                    className="px-1 rounded-full w-6 h-6 bg-[#3DAECE] hover:bg-[#55b6d1] hover:shadow-sm rounded-full transition-all text-white"
                                    onClick={() => selectDate(addDays(selectedDate, 1))}
                                >
                                    <ChevronRight size={16}/>
                                </button>
                            </div>
                        </div>

                        <SlotGrid />

                        <div className="mt-2 pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-3 mb-6">
                                <input 
                                    type="checkbox" 
                                    id="terms"
                                    checked={agreed} 
                                    onChange={e => setAgreed(e.target.checked)} 
                                    className="w-4 h-4 accent-black cursor-pointer" 
                                />
                                <label htmlFor="terms" className="text-sm text-black cursor-pointer select-none">
                                    I have read and agree to the Terms & Conditions
                                </label>
                            </div>
                            
                            <button 
                                disabled={!isFormValid}
                                onClick={handleBooking}
                                className="w-full bg-[#221F20] text-white py-4 rounded-md font-thin text-sm tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-gray-800 flex items-center justify-center gap-3"
                            >
                                SUBMIT
                                <MoveRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className='w-full lg:w-5/12 p-6 pl-2'>
                        <div className="bg-gradient-to-b from-[#F8F8F8] via-[#F4F4F4] to-[#FFFFFF]  p-6 text-sm font-light text-black rounded-xl">
                            <h2 className="text-lg font-normal mb-2">Terms & Conditions</h2>
                            <ol className="list-decimal list-outside ml-5 space-y-1">
                                <li className="pl-2">
                                    Operating Hours: 06 AM to 10 PM.
                                </li>
                                
                                <li className="pl-2">
                                    Shutdown for Floor Cleaning: 2:00 PM to 3:00 PM.
                                    <p className="leading-relaxed">
                                        Please note that the facility will undergo floor cleaning during this time. 
                                        We kindly ask all members to plan their visits accordingly.
                                    </p>
                                </li>
                                
                                <li className="pl-2">
                                    Access Restrictions:
                                    <ul className="list-disc list-outside ml-4 space-y-1">
                                        <li className="pl-1">
                                            Outsiders: Only registered members are permitted access to the facility.
                                        </li>
                                        <li className="pl-1">
                                            Pets: For the safety and comfort of all members, pets are not allowed within the premises.
                                        </li>
                                    </ul>
                                </li>
                                
                                <li className="pl-2">
                                    Barcode Access:
                                    <p className="leading-relaxed">
                                         All members are required to use their barcode for entry. Please ensure your barcode is scanned upon arrival.
                                    </p> 
                                    
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </>
        
            )}
        </div>
    );
};