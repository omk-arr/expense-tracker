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
  CheckCircle
} from 'lucide-react';

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

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 p-4 sm:p-6 flex justify-between items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            XpenseFlow
          </span>
        </motion.div>
        <motion.button
          className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/auth')}
        >
          Get Started
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master Your
              <motion.span 
                className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Finances
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Track expenses, analyze spending patterns, and get AI-powered insights 
              to make smarter financial decisions. Your money, your rules.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={itemVariants}
            >
              <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-base sm:text-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
              >
                Start Tracking
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-500 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="relative mt-8 lg:mt-0"
            variants={itemVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Monthly Overview</h3>
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold text-green-400"
                  variants={pulseVariants}
                  animate="animate"
                >
                  ${sampleData.totalExpenses.toLocaleString()}
                </motion.div>
              </div>
              
              <div className="space-y-3">
                {sampleData.categories.slice(0, 3).map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-300">{category.name}</span>
                    </div>
                    <motion.span 
                      className="font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      ${category.amount}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Why Choose 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> XpenseFlow</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Powerful features designed to give you complete control over your financial life
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description: "Get personalized recommendations and spending predictions powered by advanced machine learning",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: BarChart3,
              title: "Visual Analytics",
              description: "Beautiful charts and graphs that make understanding your spending patterns effortless",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Target,
              title: "Smart Budgeting",
              description: "Set goals and track progress with intelligent budget recommendations",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: Calendar,
              title: "Monthly & Yearly Reports",
              description: "Comprehensive reports that help you plan for the future and optimize spending",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: Shield,
              title: "Bank-Level Security",
              description: "Your financial data is protected with enterprise-grade encryption",
              color: "from-indigo-500 to-purple-500"
            },
            {
              icon: Smartphone,
              title: "Multi-Platform Sync",
              description: "Access your data anywhere with seamless synchronization across all devices",
              color: "from-teal-500 to-blue-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <motion.div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${feature.color} p-3 sm:p-4 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Analytics Preview Section */}
      <motion.section 
        className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Real-time Financial
              <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
              Our AI analyzes your spending patterns to provide actionable insights 
              and help you make better financial decisions for the future.
            </p>
            
            <div className="space-y-4">
              {[
                "Predictive spending analysis",
                "Automated categorization",
                "Personalized savings recommendations",
                "Budget optimization alerts"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold">Spending Analysis</h3>
                <motion.div 
                  className="flex items-center space-x-2 text-green-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base font-semibold">+{sampleData.monthlyGrowth}%</span>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                {sampleData.categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm sm:text-base text-gray-300">{category.name}</span>
                      <span className="text-sm sm:text-base font-semibold">${category.amount}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(category.amount / Math.max(...sampleData.categories.map(c => c.amount))) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center px-4">
          <motion.div
            className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-purple-500"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Financial Future?
              </span>
            </motion.h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of users who have taken control of their finances with XpenseFlow
            </p>
            
            <motion.button
            className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-lg sm:text-xl font-bold hover:from-green-600 hover:to-blue-700 transition-all duration-300 flex items-center mx-auto group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
            >
              <Zap className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
              Get Started for Free
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      {/* <motion.footer 
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
      </motion.footer> */}
    </div>
  );
};

export default ExpenseTrackerLanding;