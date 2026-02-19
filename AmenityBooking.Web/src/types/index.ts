export interface Amenity {
    id: number;
    name: string;
    type: string;
    icon: string;
}

export interface Slot {
    id: number;
    startTime: string;  
    endTime: string;
    isBooked: boolean;
}