import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { getAuth } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useBookings } from '../../hooks/useBookings';
import { useClasses } from '../../hooks/useClasses';

const BookingSuccess: NextPage = () => {
    const router = useRouter();
    const [user, userLoading, userError] = useAuthState(getAuth());
    const [classes, classesLoading, classesError] = useClasses();
    const danceClass = classes?.find((x) => x.stripeId === router.query['id']);
    const dancerType = router.query['dancerType'] || '';

    useEffect(() => {
        if (danceClass) {
            set(ref(getDatabase(), `bookings/${user?.uid}/${danceClass?.id}`), {
                type: dancerType,
            });
        }
    }, [danceClass, dancerType]);

    return (
        <div className="flex justify-center my-32 flex-row gap-8 max-w-4xl mx-auto">
            <CheckCircleIcon className="h-40 w-40 text-green-600" />
            <div className="text-left">
                <h6 className="text-purple-700 font-bold">
                    Payment successful
                </h6>
                <h1 className="text-7xl font-bold text-black">
                    Thanks for booking!
                </h1>
                <p className="max-w-xl mt-4 mb-10 text-gray-500 text-lg">
                    We appreciate your booking, we're currently processing it.
                    Hang tight and we'll send you a confirmation email at{' '}
                    <span className="text-purple-700">{user?.email}</span>
                </p>

                {danceClass && (
                    <>
                        <div className="border-t border-b border-gray-300 py-4 flex flex-row justify-between">
                            <div>
                                <div className="font-bold">
                                    {danceClass?.name}
                                </div>
                                <div>
                                    {danceClass?.weekday} {danceClass?.duration}{' '}
                                    minutes
                                </div>

                                <p className="mt-4 text-gray-500">
                                    {danceClass?.description}
                                </p>
                            </div>
                            <div>${danceClass?.price}</div>
                        </div>
                        <div className="border-b border-gray-300 py-4 flex flex-row justify-between">
                            <div>
                                <div className="font-bold">Total</div>
                            </div>
                            <div className="font-bold">
                                ${danceClass?.price}
                            </div>
                        </div>
                    </>
                )}

                <div className="mt-10 self-end">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-purple-700 hover:underline"
                    >
                        <ArrowLeftIcon height="16" width="16" /> Back to class
                        timetable
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
