import { DotsHorizontalIcon, RefreshIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useBookings } from "../hooks/useBookings";
import { useClasses } from "../hooks/useClasses";
import { DanceClass } from "../types/DanceClass";
import { Button } from "./Button";
import { ClassTimetableRow } from "./ClassTimetableRow";
import { ClassTimetableRowHeader } from "./ClassTimetableRowHeader";
import { Loading } from "./Loading";

interface ClassTimetableProps {
  onRowClick: (danceClass: DanceClass) => void;
  selectedClass?: DanceClass;
}

export const ClassTimetable: React.FC<ClassTimetableProps> = ({
  onRowClick,
  selectedClass,
}) => {
  const [classes, loading, error] = useClasses();
  const [bookings, bookingsLoading, bookingsError] = useBookings();
  const [selectedClassId, setSelectedClassId] = useState<string>();

  useEffect(() => {
    if (selectedClass) {
      setSelectedClassId(selectedClass.id);
    }
  }, [selectedClass]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const todaysClasses = classes
    ?.filter((x) => dayjs(x.startDate) <= today && dayjs(x.endDate) >= today)
    .filter((x) => x.weekday === today.format("dddd"));
  const tomorrowsClasses = classes
    ?.filter(
      (x) => dayjs(x.startDate) <= tomorrow && dayjs(x.endDate) >= tomorrow
    )
    .filter((x) => x.weekday === tomorrow.format("dddd"));
  const thisWeeksClasses = classes?.filter(
    (x) =>
      dayjs(x.startDate) <= today.endOf("week") &&
      dayjs(x.endDate) >= today.startOf("week")
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center w-full max-w-md p-16">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-6 flex-shrink-1 flex-grow-0 w-full max-w-md">
      <div className="w-full shadow-xl border border-purple-500 bg-white flex-1 rounded-md self-start overflow-hidden">
        {(todaysClasses?.length ?? 0) > 0 && (
          <>
            <ClassTimetableRowHeader>Today</ClassTimetableRowHeader>
            {todaysClasses?.map((x) => (
              <ClassTimetableRow
                key={x.id}
                booked={bookings?.some((y) => y.classId == x.id)}
                danceClass={x}
                onClick={onRowClick}
                selected={x.id === selectedClassId}
              />
            ))}
          </>
        )}

        {(tomorrowsClasses?.length ?? 0) > 0 && (
          <>
            <ClassTimetableRowHeader>Tomorrow</ClassTimetableRowHeader>
            {tomorrowsClasses?.map((x) => (
              <ClassTimetableRow
                key={x.id}
                booked={bookings?.some((y) => y.classId == x.id)}
                danceClass={x}
                onClick={onRowClick}
                selected={x.id === selectedClassId}
              />
            ))}
          </>
        )}

        {(thisWeeksClasses?.length ?? 0) > 0 && (
          <>
            <ClassTimetableRowHeader>Later this week</ClassTimetableRowHeader>
            {thisWeeksClasses?.map((x) => (
              <ClassTimetableRow
                key={x.id}
                booked={bookings?.some((y) => y.classId == x.id)}
                danceClass={x}
                onClick={onRowClick}
                selected={x.id === selectedClassId}
              />
            ))}
          </>
        )}
      </div>

      <Button appearance="secondary">
        <RefreshIcon className="h-5 w-5 inline-block" /> Load more
      </Button>
    </div>
  );
};
