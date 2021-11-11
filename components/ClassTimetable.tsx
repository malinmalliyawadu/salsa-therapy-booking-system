import { DotsHorizontalIcon, RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import { useBookings } from "../hooks/useBookings";
import { useClasses } from "../hooks/useClasses";
import { DanceClass } from "../types/DanceClass";
import { Button } from "./Button";
import { ClassTimetableRow } from "./ClassTimetableRow";
import { ClassTimetableRowHeader } from "./ClassTimetableRowHeader";

interface ClassTimetableProps {
  onRowClick: (danceClass: DanceClass) => void;
}

export const ClassTimetable: React.FC<ClassTimetableProps> = ({
  onRowClick,
}) => {
  const [classes, loading, error] = useClasses();
  const [bookings, bookingsLoading, bookingsError] = useBookings();
  console.log(bookings);

  return (
    <div className="flex flex-col justify-center gap-6 flex-shrink-1">
      <div className="shadow-xl border border-purple-500 bg-white flex-1 rounded-md self-start overflow-hidden">
        <ClassTimetableRowHeader>Today</ClassTimetableRowHeader>
        {classes?.map((x) => (
          <ClassTimetableRow
            booked={bookings?.some((y) => y.classId == x.id)}
            danceClass={x}
            onClick={onRowClick}
          />
        ))}

        <ClassTimetableRowHeader>Tomorrow</ClassTimetableRowHeader>
        {classes?.map((x) => (
          <ClassTimetableRow
            booked={bookings?.some((y) => y.classId == x.id)}
            danceClass={x}
            onClick={onRowClick}
          />
        ))}

        <ClassTimetableRowHeader>Later this week</ClassTimetableRowHeader>
        {classes?.map((x) => (
          <ClassTimetableRow
            booked={bookings?.some((y) => y.classId == x.id)}
            danceClass={x}
            onClick={onRowClick}
          />
        ))}
      </div>

      <Button appearance="secondary">
        <RefreshIcon className="h-5 w-5 inline-block" /> Load more
      </Button>
    </div>
  );
};
