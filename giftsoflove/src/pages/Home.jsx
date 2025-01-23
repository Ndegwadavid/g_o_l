// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BookCard3D from '../components/BookCard3D';
import { bookTemplates } from '../data/books';

export default function Home() {
  const navigate = useNavigate();
  
  // Get showcase books for homepage display
  const showcaseBooks = Object.values(bookTemplates)
    .flat()
    .filter(book => book.isShowcase);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section with Books */}
      <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Create Your Perfect
            <span className="block text-rose-500">Love Story</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Personalized books for every special moment in your life
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 
                     transition-colors shadow-lg hover:shadow-xl"
            onClick={() => navigate('/books')}
          >
            Explore Our Collection
          </motion.button>
        </div>

        {/* Showcase Books */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <BookCard3D
                book={book}
                onCustomize={() => navigate(`/customize/${book.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}