import { ref, getDatabase, get, child } from "@firebase/database";
import { useList, useListVals } from "react-firebase-hooks/database";
import { DanceClass } from "../types/DanceClass";

const options = {
  transform: (val: any) => ({
    ...val,
    startDate: new Date(val.startDate),
    endDate: new Date(val.endDate),
  }),
};

export const useClasses = () => {
  return useListVals<DanceClass>(ref(getDatabase(), "classes"), options);
};
