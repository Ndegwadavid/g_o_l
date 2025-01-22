// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.h1 
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create Your Perfect Love Story
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Personalized books for every special moment
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/books" 
            className="glass px-8 py-3 rounded-full text-gray-800 hover:bg-white/30 transition-colors"
          >
            Explore Books
          </Link>
        </motion.div>
      </section>

      {/* Featured Books Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add your Book3D component here for each featured book */}
        </div>
      </section>
    </div>
  );
};

export default Home;