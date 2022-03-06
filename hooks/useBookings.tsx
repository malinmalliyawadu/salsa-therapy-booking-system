import { getAuth } from '@firebase/auth';
import { ref, getDatabase } from '@firebase/database';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useList } from 'react-firebase-hooks/database';
import { Booking } from '../types/Booking';

export const useBookings = (): [
    Booking[] | undefined,
    boolean,
    Error | undefined
] => {
    const [user, userLoading, userError] = useAuthState(getAuth());
    const [snapshots, loading, error] = useList(
        ref(getDatabase(), `bookings/${user?.uid}`)
    );
    const [bookings, setBookings] = useState<Booking[]>();

    useEffect(() => {
        if (snapshots && user) {
            setBookings(
                snapshots.map((x) => {
                    const rawData = x.val();

                    return {
                        ...rawData,
                        classId: x.key,
                    } as Booking;
                })
            );
        }
    }, [snapshots, user]);

    return [bookings, loading, error];
};
