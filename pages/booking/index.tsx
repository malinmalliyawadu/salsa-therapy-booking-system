import dayjs from 'dayjs';
import { getAuth } from 'firebase/auth';
import { NextPage } from 'next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loading } from '../../components/Loading';
import { useBookings } from '../../hooks/useBookings';
import { useClasses } from '../../hooks/useClasses';

const TH: React.FC = ({ children }) => (
    <th className="align-bottom py-3 px-6 text-xs font-medium text-left text-white uppercase">
        {children}
    </th>
);

const TD: React.FC<{ className?: string }> = ({ children, className }) => (
    <td
        className={`py-4 px-6 text-sm font-medium text-gray-900 align-top ${className}`}
    >
        {children}
    </td>
);

const Bookings: NextPage = () => {
    const [bookings, bookingsLoading, bookingsError] = useBookings();
    const [classes, classesLoading] = useClasses();

    return (
        <div className="m-6">
            <h1 className="font-bold text-black text-7xl mb-8 tracking-tighter text-center">
                Your Bookings
            </h1>

            {(bookings?.length || 0) > 0 && (
                <div className="flex flex-col">
                    <div className="overflow-x-auto shadow-xl sm:rounded-xl">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden ">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead className="bg-gradient-to-r from-gray-500 via-gray-700 to-gray-800">
                                        <tr>
                                            <TH>Name</TH>
                                            <TH>Description</TH>
                                            <TH>Duration</TH>
                                            <TH>Weekday</TH>
                                            <TH>Start Date</TH>
                                            <TH>End Date</TH>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings?.map((x) => {
                                            const matchedClass = classes?.find(
                                                (y) => y.id == x.classId
                                            );

                                            return (
                                                <tr key={matchedClass?.id}>
                                                    <TD>
                                                        {matchedClass?.name}
                                                    </TD>
                                                    <TD>
                                                        {
                                                            matchedClass?.description
                                                        }
                                                    </TD>
                                                    <TD>
                                                        {matchedClass?.duration}
                                                    </TD>
                                                    <TD>
                                                        {matchedClass?.weekday}
                                                    </TD>
                                                    <TD>
                                                        {dayjs(
                                                            matchedClass?.startDate
                                                        ).format('D MMMM YYYY')}
                                                    </TD>
                                                    <TD>
                                                        {dayjs(
                                                            matchedClass?.endDate
                                                        ).format('D MMMM YYYY')}
                                                    </TD>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(bookingsLoading || classesLoading) && (
                <div className="flex flex-col justify-center w-full max-w-md p-16 m-auto">
                    <Loading />
                </div>
            )}

            {bookings?.length === 0 && (
                <div className="text-xl text-center">Nothing yet ☹️</div>
            )}
        </div>
    );
};

export default Bookings;
