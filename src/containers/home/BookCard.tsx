import React, { forwardRef, useEffect, useState } from 'react';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Book } from 'interfaces/books.interface';
interface BookCardProps {
  book: Book;
  selectedCategory: string | null;
}
type Ref = HTMLAnchorElement;

const BookCard = forwardRef<Ref, BookCardProps>(
  ({ book, selectedCategory }, ref) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
      const bookmarked = localStorage.getItem('bookmarks');

      if (bookmarked) {
        if (
          (JSON.parse(bookmarked as string) as Book[]).some(
            (bookmark: Book) => bookmark.id === book.id
          )
        ) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      }
    }, []);

    const handleBookmark = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const bookmarked = localStorage.getItem('bookmarks');

      if (!isBookmarked) handleAddBookmark(bookmarked);
      else handleRemoveBookmark(bookmarked);
    };

    const handleAddBookmark = (bookmarked: string | null) => {
      if (bookmarked) {
        const newData = [...JSON.parse(bookmarked), book];
        localStorage.setItem('bookmarks', JSON.stringify(newData));
      } else {
        const newData = [{ ...book }];
        localStorage.setItem('bookmarks', JSON.stringify(newData));
      }

      setIsBookmarked(true);
    };

    const handleRemoveBookmark = (bookmarked: string | null) => {
      console.log('test');
      const newData = JSON.parse(bookmarked as string).filter(
        (bookmark: Book) => bookmark.id !== book.id
      );

      localStorage.setItem('bookmarks', JSON.stringify(newData));
      setIsBookmarked(false);
    };

    return (
      <Link to={`/book/${book.id}`} ref={ref}>
        <div className="cursor-pointer">
          <img src={book.cover_url} alt="" />
          <div className="flex flex-row items-center">
            <div className="mr-auto">
              <h1 className="font-semibold text-[#333] mt-2">{book.title}</h1>
              <p className="text-xs text-[#333]">{selectedCategory}</p>
            </div>
            <button onClick={handleBookmark}>
              {isBookmarked ? <RiBookmarkFill /> : <RiBookmarkLine />}
            </button>
          </div>
        </div>
      </Link>
    );
  }
);

BookCard.displayName = 'BookCard';

export default BookCard;
