// src/components/layouts/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Gift, Sparkles, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [timeUntilValentines, setTimeUntilValentines] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const categories = [
    { 
      name: 'Valentine Special', 
      icon: <Heart className="text-pink-500" />, 
      path: '/books/valentine',
      description: 'Express your love this Valentine',
      isSpecial: true
    },
    { 
      name: 'Graduation', 
      icon: <GraduationCap className="text-blue-500" />, 
      path: '/books/graduation',
      description: 'Celebrate academic success'
    },
    { 
      name: 'Birthday', 
      icon: <Gift className="text-purple-500" />, 
      path: '/books/birthday',
      description: 'Make their day special'
    },
    { 
      name: 'Anniversary', 
      icon: <Calendar className="text-red-500" />, 
      path: '/books/anniversary',
      description: 'Celebrate your love journey'
    },
    { 
      name: 'Special Events', 
      icon: <Sparkles className="text-yellow-500" />, 
      path: '/books/special',
      description: 'For unique moments'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const valentines = new Date(2025, 1, 14); // February 14, 2025
      const difference = valentines - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeUntilValentines({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 hidden lg:block">
      <div className="h-full glass p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-rose-500">
        {/* Valentine's Countdown */}
        <motion.div 
          className="mb-8 p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl shadow-xl"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <h3 className="text-lg font-bold text-rose-600 mb-2 flex items-center gap-2">
            <Heart className="fill-current" />
            Valentine's Day
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-xl font-bold text-rose-600">{timeUntilValentines.days}</div>
              <div className="text-xs text-gray-600">Days</div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-xl font-bold text-rose-600">{timeUntilValentines.hours}</div>
              <div className="text-xs text-gray-600">Hours</div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-xl font-bold text-rose-600">{timeUntilValentines.minutes}</div>
              <div className="text-xs text-gray-600">Mins</div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-xl font-bold text-rose-600">{timeUntilValentines.seconds}</div>
              <div className="text-xs text-gray-600">Secs</div>
            </div>
          </div>
          <p className="text-sm text-rose-600 mt-2 text-center">Limited time offer!</p>
        </motion.div>

        <div className="space-y-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative p-4 rounded-xl transition-all duration-200
                          ${location.pathname === category.path
                            ? 'bg-white/30 shadow-lg'
                            : 'hover:bg-white/20'
                          }
                          ${category.isSpecial ? 'border-2 border-rose-400 bg-rose-50/30' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl 
                    ${location.pathname === category.path
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/50'
                    }`}>
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>

                {location.pathname === category.path && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute inset-0 rounded-xl border-2 border-rose-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {category.isSpecial && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                    Special
                  </span>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}