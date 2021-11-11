import { DanceClass } from "../types/DanceClass";

interface ClassTimetableRowProps {
  danceClass: DanceClass;
  bookedStatus?: "Booked" | "Waitlisted";
}

export const ClassTimetableRow: React.FC<ClassTimetableRowProps> = ({
  danceClass,
  bookedStatus,
}) => {
  return (
    <div className="p-4 grid grid-cols-3 border-b hover:bg-yellow-50 cursor-pointer">
      <div className="w-24">{danceClass.classStartTime}</div>
      <div>{danceClass.name}</div>
      <div className="text-right">
        {bookedStatus === "Booked" && (
          <div className="inline-block text-xs font-semibold text-white py-1 px-2 bg-green-500 rounded-full">
            Booked
          </div>
        )}
      </div>
    </div>
  );
};
