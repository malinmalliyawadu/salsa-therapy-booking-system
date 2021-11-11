import React from "react";
import { useClasses } from "../hooks/useClasses";
import { DanceClass } from "../types/DanceClass";
import { ClassTimetableRow } from "./ClassTimetableRow";
import { ClassTimetableRowHeader } from "./ClassTimetableRowHeader";

interface ClassTimetableProps {
  onRowClick: (danceClass: DanceClass) => void;
}

export const ClassTimetable: React.FC<ClassTimetableProps> = ({
  onRowClick,
}) => {
  const [classes, loading, error] = useClasses();

  return (
    <div className="shadow-xl border border-gray-300 bg-white flex-1 rounded-md self-start overflow-hidden">
      <ClassTimetableRowHeader>Today</ClassTimetableRowHeader>
      {classes?.map((x) => (
        <ClassTimetableRow danceClass={x} onClick={onRowClick} />
      ))}

      <ClassTimetableRowHeader>Tomorrow</ClassTimetableRowHeader>
      {classes?.map((x) => (
        <ClassTimetableRow danceClass={x} onClick={onRowClick} />
      ))}

      <ClassTimetableRowHeader>This week</ClassTimetableRowHeader>
      {classes?.map((x) => (
        <ClassTimetableRow danceClass={x} onClick={onRowClick} />
      ))}
    </div>
  );
};
