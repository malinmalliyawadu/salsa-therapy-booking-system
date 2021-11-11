import {
  CalendarIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";
import { DanceClass } from "../types/DanceClass";
import { Button } from "./Button";
import { AnimatePresence, motion } from "framer-motion";

interface ClassDescriptionProps {
  danceClass: DanceClass;
}

export const ClassDescription: React.FC<ClassDescriptionProps> = ({
  danceClass,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      className="shadow-xl overflow-hidden border border-gray-300 bg-white flex-1 rounded-md self-start"
    >
      <h2 className="p-4 font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white border-b text-2xl">
        {danceClass.name}
      </h2>
      <div className="p-4 bg-gray-50">
        <div className="flex gap-2 items-center">
          <CalendarIcon className="h-4 w-4" />
          {new Date().toLocaleDateString("en-NZ")} {danceClass.classStartTime} -{" "}
          {danceClass.classEndTime}
        </div>
        <div className="flex gap-2 items-center">
          <LocationMarkerIcon className="h-4 w-4" />
          <a
            href="https://g.page/SalsaTherapy?share"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-purple-500 flex items-center"
          >
            Full Swing, 80 Cuba Street, Te Aro, Wellington 6011
            <ExternalLinkIcon className="h-4 w-4 inline-block ml-1" />
          </a>
        </div>
        <div className="flex gap-2 items-center">
          <UserGroupIcon className="h-4 w-4" />6 spaces available
        </div>
      </div>
      <div className="p-4 ">
        <h3 className="text-lg font-bold">Details</h3>
        <p>
          Fun and sweaty class, really focusing on technique and getting the
          most out of our exercises. We'll be toning our muscles we use most for
          dancing while grooving to upbeat music!
        </p>
      </div>
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold">Instructions</h3>
        <p>
          Bring comfy workout clothes, good gym shoes. Bring a mat for floor
          work but not mandatory.
        </p>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">Tickets</h3>
        <div className="flex justify-between items-end">
          <div className="text-lg">$15.00</div>
          <Button>Book class</Button>
        </div>
      </div>
    </motion.div>
  );
};
