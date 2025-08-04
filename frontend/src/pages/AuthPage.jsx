import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { 
  DollarSign, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Globe, 
  Calendar,
  Eye, 
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    countryCode: '+1',
    mobile: '',
    age: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+61', country: 'AU' },
    { code: '+81', country: 'JP' },
    { code: '+86', country: 'CN' },
    { code: '+7', country: 'RU' },
    { code: '+39', country: 'IT' },
    { code: '+34', country: 'ES' },
    { code: '+55', country: 'BR' },
    { code: '+52', country: 'MX' },
    { code: '+82', country: 'KR' },
    { code: '+65', country: 'SG' },
    { code: '+971', country: 'AE' },
    { code: '+966', country: 'SA' },
    { code: '+27', country: 'ZA' },
    { code: '+234', country: 'NG' },
    { code: '+20', country: 'EG' },
    { code: '+972', country: 'IL' },
    { code: '+31', country: 'NL' },
    { code: '+46', country: 'SE' },
    { code: '+47', country: 'NO' },
    { code: '+45', country: 'DK' },
    { code: '+41', country: 'CH' },
    { code: '+43', country: 'AT' },
    { code: '+32', country: 'BE' },
    { code: '+351', country: 'PT' },
    { code: '+353', country: 'IE' },
    { code: '+48', country: 'PL' },
    { code: '+420', country: 'CZ' },
    { code: '+36', country: 'HU' },
    { code: '+30', country: 'GR' },
    { code: '+40', country: 'RO' },
    { code: '+64', country: 'NZ' },
    { code: '+62', country: 'ID' },
    { code: '+60', country: 'MY' },
    { code: '+66', country: 'TH' },
    { code: '+84', country: 'VN' }
  ].sort((a, b) => {
    // Sort by country name
    return a.country.localeCompare(b.country);
  });

  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!formData.email) newErrors.email = '📧 Hey! We need your email to find you!';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '🤔 That doesn\'t look like an email... try again!';
      
      if (!formData.password) newErrors.password = '🔒 Password is required, buddy!';
      else if (formData.password.length < 6) newErrors.password = '💪 Come on, make it stronger! At least 6 characters!';
      else if (formData.password === '123456' || formData.password === 'password') newErrors.password = '🙄 Really? That\'s your password?';
    } else {
      if (!formData.username) newErrors.username = '👤 Pick a cool username!';
      else if (formData.username.length < 3) newErrors.username = '😅 Too short! Make it at least 3 characters!';
      
      if (!formData.firstName) newErrors.firstName = '👋 What should we call you?';
      
      if (!formData.email) newErrors.email = '📧 We need your email to send you cool stuff!';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '🤨 Hmm... that email looks suspicious!';
      
      if (!formData.password) newErrors.password = '🔐 Create a secret password!';
      else if (formData.password.length < 6) newErrors.password = '🦾 Make it stronger! At least 6 characters!';
      else if (formData.password === '123456' || formData.password === 'password') newErrors.password = '🤦‍♂️ Seriously? Pick something better!';
      
      if (!formData.mobile) newErrors.mobile = '📱 We need your number (don\'t worry, no spam!)';
      else if (!/^\d{10,}$/.test(formData.mobile)) newErrors.mobile = '📞 That doesn\'t look like a valid number!';
      
      if (!formData.gender) newErrors.gender = '🚻 Please select your gender!';
      
      if (formData.age) {
        if (isNaN(formData.age)) newErrors.age = '🔢 That\'s not a number, genius!';
        else if (formData.age < 13) newErrors.age = '👶 Too young for financial planning!';
        else if (formData.age > 150) newErrors.age = '👴 Are you kidding bro??? 150+ years old?';
        else if (formData.age > 120) newErrors.age = '🧙‍♂️ Wow, a financial wizard from ancient times!';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const { handleSignup, handleLogin, isAuthLoading, authErrors } = useAuth();

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await handleLogin({
          email: formData.email,
          password: formData.password
        });
      } else {
        await handleSignup(formData);
      }
    } catch (error) {
      // Error handling is done in useAuth hook
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      username: '',
      firstName: '',
      lastName: '',
      countryCode: '+1',
      mobile: '',
      age: '',
      gender: ''
    });
    setErrors({});
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialButtons = [
    { 
      name: 'Google', 
      color: 'from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 text-gray-700 border border-gray-300', 
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      color: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white', 
      logo: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      color: 'from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white', 
      logo: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-4">
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <DollarSign className="w-10 h-10 text-green-400" />
            <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              XpenseFlow
            </span>
          </div>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl"
          variants={itemVariants}
        >
          <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
            <motion.button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => isLogin || toggleAuthMode()}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => !isLogin || toggleAuthMode()}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          errors.password ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {errors.password && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.password}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          errors.username ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                        placeholder="Choose a username"
                      />
                      {errors.username && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.username}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.firstName}
                        </motion.div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          errors.password ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {errors.password && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.password}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="pl-12 pr-8 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          {countryCodes.map(({ code, country }) => (
                            <option key={code} value={code} className="bg-gray-800">
                              {code} ({country})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                            errors.mobile ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                          }`}
                          placeholder="Enter mobile number"
                        />
                      </div>
                    </div>
                    {errors.mobile && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center mt-1 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.mobile}
                      </motion.div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Age
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          min="13"
                          max="120"
                          className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                            errors.age ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                          }`}
                          placeholder="Age"
                        />
                        {errors.age && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center mt-1 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.age}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer ${
                          errors.gender ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                        }`}
                      >
                        <option value="" className="bg-gray-800">Select gender</option>
                        <option value="male" className="bg-gray-800">Male</option>
                        <option value="female" className="bg-gray-800">Female</option>
                        <option value="other" className="bg-gray-800">Other</option>
                      </select>
                      {errors.gender && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Required
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>

          {isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {socialButtons.map((social, index) => (
                  <motion.button
                    key={social.name}
                    className={`flex items-center justify-center px-4 py-3 bg-gradient-to-r ${social.color} font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="mr-2">{social.logo}</span>
                    <span className="hidden sm:inline text-sm">{social.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-gray-400">
                By creating an account, you agree to our{' '}
                <button className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleAuthMode}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;