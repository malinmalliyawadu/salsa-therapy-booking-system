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
    const [snapshots, loading, error] = useList(ref(getDatabase(), 'bookings'));
    const [bookings, setBookings] = useState<Booking[]>();
    const [user, userLoading, userError] = useAuthState(getAuth());

    useEffect(() => {
        if (snapshots && user) {
            setBookings(
                snapshots
                    .map((x) => {
                        const rawData = x.val();

                        return {
                            ...rawData,
                            id: x.key,
                        } as Booking;
                    })
                    .filter((x) => x.userId === user.uid)
            );
        }
    }, [snapshots, user]);

    return [bookings, loading, error];
};
