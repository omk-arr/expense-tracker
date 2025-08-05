
import { motion, useAnimation, useInView } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useState } from 'react';
import { Eye, EyeOff, Bell, Menu, X } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const Navbar = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [categoryTimeRange, setCategoryTimeRange] = useState('month');
  const [showBalance, setShowBalance] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useAppStore((state) => state.isMobile);
  isMobile ? console.log("Mobile") : console.log("desktop")
  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    totalBalance: 25420.50
  };
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
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
      <motion.header
        className="relative z-10 bg-gray-900/30 backdrop-blur-md border-b border-gray-700"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 sm:px-6 py-2 sm:py-4">
          <div className="flex flex-row items-center justify-between sm:space-y-0">
            {/* Logo Section */}
            <div className="flex items-center justify-between sm:justify-start space-x-4">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <DollarSign className={`text-green-400 ${isMobile ? 'w-5 h-5' : 'w-6 h-6 sm:w-8 sm:h-8'}`} />
                <span className={`${isMobile ? 'text-lg' : 'text-xl'} sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent`}>
                  XpenseFlow
                </span>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-between justify-end space-x-4 space-x-6">
              <motion.button
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                className="relative text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* Hamburger Menu */}
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                {drawerOpen ? (
                  <X className="w-4 h-4 text-white" />
                ) : (
                  <Menu className="w-4 h-4 text-white" />
                )}
              </motion.div>
              {/* <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-gray-400">Welcome back,</p>
                  <p className="text-sm font-semibold text-white truncate max-w-[100px] sm:max-w-none">
                    {userData.name}
                  </p>
                </div>
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </motion.div>
              </div> */}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Slide-in Drawer */}
            <>
                {/* Backdrop with blur (instead of solid black) */}
                {drawerOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
                        onClick={() => setDrawerOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
                {/* Drawer Panel */}
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: drawerOpen ? 0 : '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-800 z-50 shadow-2xl border-l border-purple-500/30 backdrop-blur-md"
                >
                    {/* Animated background elements for drawer */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-5 w-24 h-24 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
                            animate={{
                                scale: [1.2, 1, 1.2],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    <div className="relative z-10 p-6 flex flex-col space-y-6 h-full">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400">Welcome,</p>
                                <p className="text-base font-semibold text-white truncate">
                                    {userData.name}
                                </p>
                            </div>
                            <motion.button 
                                onClick={() => setDrawerOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                            </motion.button>
                        </div>
                        
                        <hr className="border-purple-500/30" />
                        
                        {/* Balance Display */}
                        <motion.div 
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <p className="text-xs text-gray-400 mb-1">Total Balance</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                {showBalance ? `${userData.totalBalance.toLocaleString()}` : '••••••'}
                            </p>
                        </motion.div>
                        
                        {/* Navigation */}
                        <nav className="flex flex-col space-y-3 text-sm flex-1">
                            <motion.button 
                                className="text-left text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                                whileHover={{ x: 5 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Edit Profile
                            </motion.button>
                            <motion.button 
                                className="text-left text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                                whileHover={{ x: 5 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Settings
                            </motion.button>
                            <motion.button 
                                className="text-left text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                                whileHover={{ x: 5 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Reports
                            </motion.button>
                        </nav>
                        
                        {/* Logout at bottom */}
                        <motion.button 
                            className="text-left text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10 border border-red-500/20"
                            whileHover={{ x: 5, scale: 1.02 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Logout
                        </motion.button>
                    </div>
                </motion.div>
            </>
    </div>
  )
}

export default Navbar