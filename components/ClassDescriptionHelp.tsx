import { motion } from "framer-motion";
import React from "react";

export const ClassDescriptionHelp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      className="p-4 shadow-xl bg-white flex-1 rounded-md self-start"
    >
      <h2 className="font-bold text-2xl mb-2">👋 Hi there</h2>
      <p>Check out our upcoming dance classes in Wellington.</p>

      <div className="mt-5 bg-purple-50 rounded-lg p-4 flex items-center gap-3">
        <span className="text-3xl">👈</span>
        <p>Click on one of the classes to get started</p>
      </div>
    </motion.div>
  );
};
