import { Booking } from "../types/Booking";
import { DanceClass } from "../types/DanceClass";

interface ClassTimetableRowProps {
  danceClass: DanceClass;
  booked?: boolean;
  onClick: (danceClass: DanceClass) => void;
  selected?: boolean;
}

export const ClassTimetableRow: React.FC<ClassTimetableRowProps> = ({
  danceClass,
  booked,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(danceClass)}
      className={`p-4 grid grid-cols-3 border-b hover:bg-yellow-50 cursor-pointer ${
        selected && "bg-yellow-400"
      }`}
    >
      <div className="w-24">{danceClass.classStartTime}</div>
      <div>{danceClass.name}</div>
      <div className="text-right">
        {booked && (
          <div className="inline-block text-xs font-semibold text-white py-1 px-2 bg-green-500 rounded-full">
            Booked
          </div>
        )}
      </div>
    </div>
  );
};
