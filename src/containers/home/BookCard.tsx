import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { Book } from 'interfaces/books.interface';

interface BookCardProps {
  book: Book;
  selectedCategory: string | null;
}
type Ref = HTMLAnchorElement;

const BookCard = forwardRef<Ref, BookCardProps>(
  ({ book, selectedCategory }, ref) => {
    return (
      <Link to={`/book/${book.id}`} ref={ref}>
        <div className="cursor-pointer">
          <img src={book.cover_url} alt="" />
          <h1 className="font-semibold text-[#333] mt-2">{book.title}</h1>
          <p className="text-xs text-[#333]">{selectedCategory}</p>
        </div>
      </Link>
    );
  }
);

BookCard.displayName = 'BookCard';

export default BookCard;
