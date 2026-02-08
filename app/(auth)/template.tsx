'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
