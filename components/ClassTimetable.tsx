import { RefreshIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useBookings } from '../hooks/useBookings';
import { useClasses } from '../hooks/useClasses';
import { DanceClass } from '../types/DanceClass';
import { Button } from './Button';
import { ClassTimetableRow } from './ClassTimetableRow';
import { ClassTimetableRowHeader } from './ClassTimetableRowHeader';
import { Loading } from './Loading';

interface ClassTimetableProps {
    onRowClick: (danceClass: DanceClass) => void;
    selectedClass?: DanceClass;
}

export const ClassTimetable: React.FC<ClassTimetableProps> = ({
    onRowClick,
    selectedClass,
}) => {
    const defaultMaxClassesToShow = 10;
    const [classes, loading, error] = useClasses();
    const [bookings, bookingsLoading, bookingsError] = useBookings();
    const [selectedClassId, setSelectedClassId] = useState<string>();
    const [maxClassesToShow, setMaxClassesToShow] = useState(
        defaultMaxClassesToShow
    );

    useEffect(() => {
        setSelectedClassId(selectedClass?.id ?? undefined);
    }, [selectedClass]);

    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    const todaysClasses = classes
        ?.filter(
            (x) => dayjs(x.startDate) <= today && dayjs(x.endDate) >= today
        )
        .filter((x) => x.weekday === today.format('dddd'));
    const tomorrowsClasses = classes
        ?.filter(
            (x) =>
                dayjs(x.startDate) <= tomorrow && dayjs(x.endDate) >= tomorrow
        )
        .filter((x) => x.weekday === tomorrow.format('dddd'));
    const thisWeeksClasses = classes?.filter(
        (x) =>
            dayjs(x.startDate) <= today.endOf('week') &&
            dayjs(x.endDate) >= today.startOf('week')
    );

    const alwaysShownClassesCount =
        (todaysClasses?.length || 0) +
        (tomorrowsClasses?.length || 0) +
        (thisWeeksClasses?.length || 0);
    const thisMonthsClassesCount = Math.max(
        0,
        maxClassesToShow - alwaysShownClassesCount
    );
    const laterThisYearClassesCount = Math.max(
        0,
        maxClassesToShow - (alwaysShownClassesCount + thisMonthsClassesCount)
    );

    const thisMonthsClasses = classes
        ?.filter(
            (x) =>
                dayjs(x.startDate) <= today.endOf('month') &&
                dayjs(x.endDate) >= today.startOf('month')
        )
        .slice(0, thisMonthsClassesCount);
    // Note: this might have some issues around dec/jan
    const laterThisYearClasses = classes
        ?.filter(
            (x) =>
                dayjs(x.startDate) <= today.endOf('year') &&
                dayjs(x.endDate) <= today.endOf('year')
        )
        .slice(0, laterThisYearClassesCount);

    if (loading) {
        return (
            <div className="flex flex-col justify-center w-full max-w-md p-16">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center gap-4 flex-shrink-1 flex-grow-0 w-full max-w-md">
            <h2 className="font-bold text-4xl mt-4 tracking-tight text-purple-700">
                Class Timetable
            </h2>
            <div className="border border-purple-300 w-full filter drop-shadow-lg shadow-lg bg-white flex-1 rounded-md self-start overflow-hidden">
                {!todaysClasses?.length &&
                    !tomorrowsClasses?.length &&
                    !thisMonthsClasses?.length && (
                        <div className="flex flex-col place-items-center justify-center h-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-xl mt-3">
                                No classes at the moment sorry!
                            </div>
                        </div>
                    )}
                {(todaysClasses?.length ?? 0) > 0 && (
                    <>
                        <ClassTimetableRowHeader>Today</ClassTimetableRowHeader>
                        {todaysClasses?.map((x) => (
                            <ClassTimetableRow
                                key={x.id}
                                booked={bookings?.some(
                                    (y) => y.classId == x.id
                                )}
                                danceClass={x}
                                onClick={onRowClick}
                            />
                        ))}
                    </>
                )}

                {(tomorrowsClasses?.length ?? 0) > 0 && (
                    <>
                        <ClassTimetableRowHeader>
                            Tomorrow
                        </ClassTimetableRowHeader>
                        {tomorrowsClasses?.map((x) => (
                            <ClassTimetableRow
                                key={x.id}
                                booked={bookings?.some(
                                    (y) => y.classId == x.id
                                )}
                                danceClass={x}
                                onClick={onRowClick}
                            />
                        ))}
                    </>
                )}

                {(thisWeeksClasses?.length ?? 0) > 0 && (
                    <>
                        <ClassTimetableRowHeader>
                            Later this week
                        </ClassTimetableRowHeader>
                        {thisWeeksClasses?.map((x) => (
                            <ClassTimetableRow
                                key={x.id}
                                booked={bookings?.some(
                                    (y) => y.classId == x.id
                                )}
                                danceClass={x}
                                onClick={onRowClick}
                            />
                        ))}
                    </>
                )}

                {(thisMonthsClasses?.length ?? 0) > 0 && (
                    <>
                        <ClassTimetableRowHeader>
                            Later this month
                        </ClassTimetableRowHeader>
                        {thisMonthsClasses?.map((x) => (
                            <ClassTimetableRow
                                key={x.id}
                                booked={bookings?.some(
                                    (y) => y.classId == x.id
                                )}
                                danceClass={x}
                                onClick={onRowClick}
                            />
                        ))}
                    </>
                )}

                {(laterThisYearClasses?.length ?? 0) > 0 && (
                    <>
                        <ClassTimetableRowHeader>
                            Later this year
                        </ClassTimetableRowHeader>
                        {laterThisYearClasses?.map((x) => (
                            <ClassTimetableRow
                                key={x.id}
                                booked={bookings?.some(
                                    (y) => y.classId == x.id
                                )}
                                danceClass={x}
                                onClick={onRowClick}
                            />
                        ))}
                    </>
                )}
            </div>
            {maxClassesToShow === defaultMaxClassesToShow && (
                <Button onClick={() => setMaxClassesToShow(40)}>
                    <RefreshIcon className="w-6 h-6 mr-2 inline-block" /> Load
                    all upcoming classes
                </Button>
            )}
        </div>
    );
};
