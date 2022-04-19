import dayjs, { Dayjs } from 'dayjs';
import { Booking } from '../types/Booking';
import { DanceClass } from '../types/DanceClass';
import weekday from 'dayjs/plugin/weekday';

interface ClassTimetableRowProps {
    danceClass: DanceClass;
    booked?: boolean;
    onClick: (danceClass: DanceClass) => void;
}

export const ClassTimetableRow: React.FC<ClassTimetableRowProps> = ({
    danceClass,
    booked,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(danceClass)}
            className={`p-4 flex border-b border-purple-300 hover:bg-purple-50 cursor-pointer`}
        >
            <div className="w-36 flex flex-col ">
                <div className="font-bold text-purple-500">
                    {danceClass.date?.format('ddd D MMM')}
                </div>
                <div>{danceClass.classStartTime}</div>
            </div>
            <div className="flex-1">{danceClass.name}</div>
        </div>
    );
};
