import React from 'react'
import {motion} from 'framer-motion'
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';



const SpendingChart = () => {
    const [timeRange, setTimeRange] = useState('7days');
    // Sample spending data for different time ranges
  const spendingData = {
    '7days': [
      { day: 'Mon', amount: 250 },
      { day: 'Tue', amount: 180 },
      { day: 'Wed', amount: 320 },
      { day: 'Thu', amount: 150 },
      { day: 'Fri', amount: 400 },
      { day: 'Sat', amount: 280 },
      { day: 'Sun', amount: 220 }
    ],
    'month': [
      { week: 'Week 1', amount: 1200 },
      { week: 'Week 2', amount: 980 },
      { week: 'Week 3', amount: 1450 },
      { week: 'Week 4', amount: 1220 }
    ],
    'year': [
      { month: 'Jan', amount: 4200 },
      { month: 'Feb', amount: 3800 },
      { month: 'Mar', amount: 4500 },
      { month: 'Apr', amount: 3900 },
      { month: 'May', amount: 4100 },
      { month: 'Jun', amount: 4800 },
      { month: 'Jul', amount: 5200 },
      { month: 'Aug', amount: 4600 },
      { month: 'Sep', amount: 4300 },
      { month: 'Oct', amount: 4900 },
      { month: 'Nov', amount: 5100 },
      { month: 'Dec', amount: 4850 }
    ],
    'all': [
      { year: '2021', amount: 42000 },
      { year: '2022', amount: 48000 },
      { year: '2023', amount: 52000 },
      { year: '2024', amount: 54250 }
    ]
  };
    const getCurrentData = () => {
    switch(timeRange) {
      case '7days':
        return spendingData['7days'];
      case 'month':
        return spendingData['month'];
      case 'year':
        return spendingData['year'];
      case 'all':
        return spendingData['all'];
      default:
        return spendingData['7days'];
    }
  };

  const getXAxisKey = () => {
    switch(timeRange) {
      case '7days':
        return 'day';
      case 'month':
        return 'week';
      case 'year':
        return 'month';
      case 'all':
        return 'year';
      default:
        return 'day';
    }
  };


    const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Spending Trend Chart */}
          <motion.div 
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Spending Trends</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTimeRange('7days')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    timeRange === '7days' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    timeRange === 'month' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeRange('year')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    timeRange === 'year' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Year
                </button>
                <button
                  onClick={() => setTimeRange('all')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    timeRange === 'all' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getCurrentData()}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey={getXAxisKey()} 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#9ca3af' }}
                  itemStyle={{ color: '#a78bfa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorSpending)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

  )
}

export default SpendingChart