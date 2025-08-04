import React from 'react'
import { motion, useAnimation, useInView } from 'framer-motion';

const Footer = () => {
  return (
      <motion.footer 
        className="relative z-10 container mx-auto px-6 py-12 border-t border-gray-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center text-gray-400">
          <motion.div 
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className="text-xl font-bold text-white">XpenseFlow</span>
          </motion.div>
          <p>© 2025 XpenseFlow. All rights reserved. Master your finances, master your future.</p>
        </div>
      </motion.footer>
  )
}

export default Footer