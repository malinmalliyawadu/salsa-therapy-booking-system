import type { NextPage } from 'next';
import React, { useState } from 'react';
import { getAuth } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ClassTimetable } from '../components/ClassTimetable';
import { ClassDescription } from '../components/ClassDescription';
import { useClasses } from '../hooks/useClasses';
import { ClassDescriptionHelp } from '../components/ClassDescriptionHelp';
import { DanceClass } from '../types/DanceClass';
import { AnimatePresence } from 'framer-motion';

const Home: NextPage = () => {
    const [user, userLoading, userError] = useAuthState(getAuth());
    const [selectedClass, setSelectedClass] = useState<DanceClass>();
    const [classes, classesLoading, classesError] = useClasses();

    return (
        <div className="flex flex-col min-h-full justify-between">
            <main className="md:flex gap-8 px-4 md:px-8 py-4 md:py-10 relative">
                <div className="md:hidden">
                    <ClassDescriptionHelp />
                </div>
                <ClassTimetable
                    onRowClick={(row) => setSelectedClass(row)}
                    selectedClass={selectedClass}
                />

                <div className="md:flex md:flex-1">
                    <AnimatePresence>
                        {selectedClass ? (
                            <div className="md:static fixed top-0 right-0 left-0 bottom-0 md:z-0 z-10">
                                <ClassDescription
                                    danceClass={selectedClass}
                                    onClose={() => setSelectedClass(undefined)}
                                />
                            </div>
                        ) : (
                            <div className="hidden md:block w-full">
                                <ClassDescriptionHelp />
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Home;
