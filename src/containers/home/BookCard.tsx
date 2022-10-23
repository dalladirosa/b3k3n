import React from 'react';
import { Link } from 'react-router-dom';

import { Book } from 'interfaces/books.interface';
import { Category } from 'interfaces/categories.interface';

interface BookCardProps {
  book: Book;
  selectedCategory: Category | undefined;
}

const BookCard: React.FC<BookCardProps> = ({ book, selectedCategory }) => {
  return (
    <Link to={`/book/${book.id}`}>
      <div className="cursor-pointer">
        <img src={book.cover_url} alt="" />
        <h1 className="font-semibold text-[#333] mt-2">{book.title}</h1>
        <p className="text-xs text-[#333]">{selectedCategory?.name}</p>
      </div>
    </Link>
  );
};

export default BookCard;
