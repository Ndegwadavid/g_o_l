// src/components/BookCard3D.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Edit, Loader } from 'lucide-react';
import { loadPDFPreview, getPDFPage } from '../utils/pdfLoader';

export default function BookCard3D({ book, onCustomize }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageImage, setCurrentPageImage] = useState(null);

  useEffect(() => {
    async function loadPreview() {
      if (book.pdfPath) {
        setIsLoading(true);
        try {
          const preview = await loadPDFPreview(book.pdfPath);
          setPreviewImage(preview);
          setCurrentPageImage(preview);
        } catch (error) {
          console.error('Failed to load preview:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadPreview();
  }, [book.pdfPath]);

  const handlePageChange = async (newPage) => {
    if (newPage !== currentPage) {
      setIsLoading(true);
      try {
        const pageImage = await getPDFPage(book.pdfPath, newPage + 1);
        setCurrentPageImage(pageImage);
        setCurrentPage(newPage);
      } catch (error) {
        console.error('Failed to change page:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full aspect-[3/4] perspective-1000">
        <motion.div
          className="w-full h-full preserve-3d shadow-xl rounded-lg overflow-hidden"
          animate={{
            rotateY: isHovered ? -20 : 0,
            z: isHovered ? 50 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Book Content */}
          <div className="absolute inset-0 bg-white">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-rose-50">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-8 h-8 text-rose-500" />
                </motion.div>
              </div>
            ) : (
              <img
                src={currentPageImage}
                alt={`${book.title} - Page ${currentPage + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            )}

            {/* Navigation Controls */}
            {isHovered && !isLoading && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0 || isLoading}
                  className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-sm">
                  {currentPage + 1} / 8
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(Math.min(7, currentPage + 1))}
                  disabled={currentPage === 7 || isLoading}
                  className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Book Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-gray-600 text-sm">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-rose-600">
            KSh {book.price.toLocaleString()}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCustomize(book)}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg flex items-center gap-2 
                     hover:bg-rose-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Customize
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}