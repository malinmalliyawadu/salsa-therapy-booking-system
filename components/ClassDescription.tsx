import {
  CalendarIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { DanceClass } from "../types/DanceClass";
import { Button } from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import { Dayjs } from "dayjs";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ButtonLink } from "./ButtonLink";
import { Modal } from "./Modal";

interface ClassDescriptionProps {
  danceClass: DanceClass;
  onClose: () => void;
}

export const ClassDescription: React.FC<ClassDescriptionProps> = ({
  danceClass,
  onClose,
}) => {
  const [user, userLoading, userError] = useAuthState(getAuth());
  const [showBookModal, setShowBookModal] = useState(false);

  const onBookClassClick = () => {
    setShowBookModal(true);
  };

  return (
    <>
      <Modal
        danceClass={danceClass}
        show={showBookModal}
        onClose={() => setShowBookModal(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2 }}
        className="shadow-xl overflow-hidden border border-gray-300 bg-white flex-1 rounded-md self-start"
      >
        <h2 className="flex justify-between p-4 font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white border-b text-2xl">
          {danceClass.name}
          <button className="" onClick={onClose}>
            <XCircleIcon className="h-9 w-9 hover:text-gray-400" />
          </button>
        </h2>

        <div className="p-4 bg-gray-50">
          <div className="flex gap-2 items-center">
            <CalendarIcon className="h-4 w-4" />
            {danceClass.weekday} {danceClass.classStartTime} -{" "}
            {danceClass.classStartTime}
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
            <UserGroupIcon className="h-4 w-4" />
            {danceClass.maxPeople} spaces available
          </div>
        </div>
        <div className="p-4 ">
          <h3 className="text-lg font-bold">Description</h3>
          <p>{danceClass.description}</p>
        </div>

        <div className="p-4 bg-gray-50">
          <h3 className="text-lg font-bold">Price</h3>
          <div className="flex justify-between items-end">
            <div className="text-5xl">${danceClass.price}</div>
            {user ? (
              <Button onClick={onBookClassClick}>Book class</Button>
            ) : (
              <ButtonLink href="/login">Book class</ButtonLink>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
