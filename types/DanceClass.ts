import { Dayjs } from 'dayjs';

export interface DanceClass {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    classStartTime: string;
    duration: string;
    extraInfo: string;
    maxPeople: number;
    description: string;
    price: number;
    weekday:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday';
    stripeId: string;
    date?: Dayjs;
}
