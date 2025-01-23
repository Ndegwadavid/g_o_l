// src/pages/Books.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookCard3D from '../components/BookCard3D';

export default function Books() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category') || 'all';
  const [books, setBooks] = useState([]);

  // Example structure for a book with PDF pages
  const graduationBook = {
    id: 'graduation-1',
    title: 'Graduation Memories',
    description: 'Celebrate academic achievements with this beautifully crafted memory book',
    price: 1900,
    category: 'graduation',
    pages: Array(8).fill('/path-to-your-pdf-pages/page.jpg') // We'll update this
  };

  const handleCustomize = (book) => {
    navigate(`/customize/${book.id}`);
  };

  useEffect(() => {
    // Here we'll load books based on category
    // You can implement a function to load and process PDFs
    const loadBooks = async () => {
      try {
        // Example structure - replace with actual PDF loading logic
        const booksData = [graduationBook];
        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      }
    };

    loadBooks();
  }, [category]);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Our Books Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard3D
            key={book.id}
            book={book}
            onCustomize={handleCustomize}
          />
        ))}
      </div>
    </div>
  );
}