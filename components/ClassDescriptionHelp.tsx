import { motion } from 'framer-motion';
import React from 'react';

export const ClassDescriptionHelp = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 flex-1 rounded-md self-start"
        >
            <h2 className="font-bold text-6xl mb-2 tracking-tight">
                Hi there 👋
            </h2>
            <p className="text-lg">
                Welcome to the Salsa Therapy booking system.
            </p>

            <div className="mt-5 bg-purple-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-3xl">👈</span>
                <p>Click on one of our upcoming classes to get started</p>
            </div>

            <div className="text-9xl my-12">💃🕺</div>
        </motion.div>
    );
};
