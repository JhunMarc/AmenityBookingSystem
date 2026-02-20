import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Amenity, Slot } from '../types';

interface BookingContextType {
    amenities: Amenity[];
    slots: Slot[];
    selectedAmenity: Amenity | null;
    selectedDate: Date;
    selectedSlotId: number | null;
    isLoading: boolean;
    isLoadingInitial: boolean;
    
    selectAmenity: (amenity: Amenity) => void;
    selectDate: (date: Date) => void;
    selectSlot: (id: number) => void;
    submitBooking: (userName: string, headCount: number, eventName: string) => Promise<boolean>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);

    const API_URL = "http://localhost:5153/api/booking"; 

    useEffect(() => {
        fetch(`${API_URL}/amenities`)
            .then(res => res.json())
            .then(data => {
                setAmenities(data);
                if (data.length > 0) setSelectedAmenity(data[0]);
                setIsLoadingInitial(false);
            })
            .catch(() => setIsLoadingInitial(false));
    }, []);

    useEffect(() => {
        if (!selectedAmenity) return;
        setIsLoading(true);
        const dateStr = selectedDate.toISOString();

        fetch(`${API_URL}/slots?amenityId=${selectedAmenity.id}&date=${dateStr}`)
            .then(res => res.json())
            .then(data => {
                setSlots(data);
                setIsLoading(false);
                setSelectedSlotId(null);
            });
    }, [selectedAmenity, selectedDate]);

    const submitBooking = async (userName: string, headCount: number, eventName: string) => {
        if (!selectedSlotId) return false;

        const res = await fetch(`${API_URL}/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                slotId: selectedSlotId,
                userName,
                headCount,
                eventName
            })
        });

        const dateStr = selectedDate.toISOString();
        fetch(`${API_URL}/slots?amenityId=${selectedAmenity!.id}&date=${dateStr}`)
            .then(r => r.json()).then(setSlots);
        setSelectedSlotId(null);
        if (res.ok) {
            return true;
        }
        return false;
    };

    return (
        <BookingContext.Provider value={{
            amenities, slots, selectedAmenity, selectedDate, selectedSlotId,isLoadingInitial, isLoading,
            selectAmenity: setSelectedAmenity,
            selectDate: setSelectedDate,
            selectSlot: setSelectedSlotId,
            submitBooking
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error("useBooking must be used within BookingProvider");
    return context;
};