import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Header } from "../components/Header";
import { ClassTimetable } from "../components/ClassTimetable";
import { ClassDescription } from "../components/ClassDescription";
import { useClasses } from "../hooks/useClasses";
import { ClassDescriptionHelp } from "../components/ClassDescriptionHelp";
import { DanceClass } from "../types/DanceClass";
import { AnimatePresence } from "framer-motion";

const Home: NextPage = () => {
  const [user, userLoading, userError] = useAuthState(getAuth());
  const [selectedClass, setSelectedClass] = useState<DanceClass>();
  const [classes, classesLoading, classesError] = useClasses();

  return (
    <div className="flex flex-col min-h-full justify-between">
      <main className="flex gap-8 px-8 py-10">
        <ClassTimetable onRowClick={(row) => setSelectedClass(row)} />

        <div className="hidden md:flex flex-1">
          <AnimatePresence>
            {selectedClass ? (
              <ClassDescription danceClass={selectedClass} />
            ) : (
              <ClassDescriptionHelp />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Home;
