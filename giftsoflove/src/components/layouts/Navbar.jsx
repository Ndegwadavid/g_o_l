// src/components/layouts/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag, GraduationCap, Gift, Sparkles, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeUntilValentines, setTimeUntilValentines] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const location = useLocation();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let valentinesDay = new Date(currentYear, 1, 14); // Month is 0-based

      if (now > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14);
      }

      const difference = valentinesDay - now;

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    const timer = setInterval(() => {
      setTimeUntilValentines(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
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

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.3 }}>
                <Heart className="h-8 w-8 text-rose-500" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-transparent bg-clip-text">
                Gifts of Love
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative p-2">
                <ShoppingBag className="h-6 w-6 text-rose-500" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 w-[80%] sm:w-[400px] h-screen bg-white/95 backdrop-blur-xl shadow-2xl z-[100]"
            >
              <div className="sticky top-0 w-full bg-white/90 backdrop-blur-sm p-4 flex justify-end border-b">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-rose-50 hover:bg-rose-100"
                >
                  <X className="h-6 w-6 text-rose-500" />
                </motion.button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl shadow-lg"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <h3 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                    <Heart className="fill-current" />
                    Valentine's Day Countdown
                  </h3>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {Object.entries(timeUntilValentines).map(([key, value]) => (
                      <div key={key} className="bg-white/50 rounded-lg p-2 text-center">
                        <div className="text-xl font-bold text-rose-600">
                          {String(value).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-600">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-xl ${
                          location.pathname === category.path
                            ? 'bg-rose-50'
                            : 'hover:bg-gray-50'
                        } ${
                          category.isSpecial ? 'border-2 border-rose-400' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-white/80 shadow-sm">
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{category.name}</h4>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                        {category.isSpecial && (
                          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                            Special
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}