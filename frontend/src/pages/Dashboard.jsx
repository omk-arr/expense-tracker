import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  PieChart, 
  Brain, 
  Shield, 
  Smartphone, 
  BarChart3,
  DollarSign,
  Calendar,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Plus
} from 'lucide-react';
import SpendingChart from '../charts/SpendingChart';

const ExpenseTrackerLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    controls.start('visible');
  }, [controls]);

  // Sample data for demonstrations
  const sampleData = {
    totalExpenses: 2847.50,
    monthlyGrowth: 12.5,
    categories: [
      { name: 'Food & Dining', amount: 890, color: '#FF6B6B' },
      { name: 'Transportation', amount: 456, color: '#4ECDC4' },
      { name: 'Entertainment', amount: 321, color: '#45B7D1' },
      { name: 'Shopping', amount: 678, color: '#96CEB4' },
      { name: 'Bills & Utilities', amount: 502, color: '#FECA57' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.main 
        className="relative z-10 px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Quick Actions */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-gray-400">Track and manage your finances</p>
          </div>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-semibold flex items-center space-x-2 hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </motion.button>
        </motion.div>
        <SpendingChart/>
        </motion.main>
    </div>
  );
};

export default ExpenseTrackerLanding;