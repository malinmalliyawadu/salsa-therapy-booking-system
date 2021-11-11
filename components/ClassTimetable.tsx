import React from "react";
import { useClasses } from "../hooks/useClasses";
import { ClassTimetableRow } from "./ClassTimetableRow";
import { ClassTimetableRowHeader } from "./ClassTimetableRowHeader";

export const ClassTimetable = () => {
  const [classes, loading, error] = useClasses();
  console.log(classes);

  return (
    <div className="shadow-xl border border-gray-300 bg-white flex-1 rounded-md self-start overflow-hidden">
      <ClassTimetableRowHeader>Today</ClassTimetableRowHeader>
      {classes?.map((x) => (
        <ClassTimetableRow danceClass={x} />
      ))}

      <ClassTimetableRowHeader>Tomorrow</ClassTimetableRowHeader>
      {classes?.map((x) => (
        <ClassTimetableRow danceClass={x} />
      ))}

      <ClassTimetableRowHeader>This week</ClassTimetableRowHeader>
      {classes?.map((x) => (
        <ClassTimetableRow danceClass={x} />
      ))}
    </div>
  );
};
