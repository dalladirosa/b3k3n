import React, { useEffect, useState } from 'react';
import { VscChevronLeft } from 'react-icons/vsc';
import Link from 'next/link';

import BookCard from 'containers/home/BookCard';
import { Book } from 'interfaces/books.interface';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const bookmarked = localStorage.getItem('bookmarks');

    if (bookmarked) {
      setBookmarks(JSON.parse(bookmarked));
    }
  }, []);

  return (
    <>
      <div>
        <Link href="/" passHref>
          <a className="flex flex-row items-center text-gray-500">
            <VscChevronLeft className="mr-3" />
            <span>Back to categories</span>
          </a>
        </Link>
        <h1 className="mt-6 font-semibold text-2xl">Bookmarked book</h1>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-gray-500 flex flex-col items-center justify-center text-2xl font-semibold flex-1">
          No bookmarked books....
        </div>
      ) : (
        <div className="mt-12 grid gap-6 grid-cols-4">
          {bookmarks.map((book: Book & { category: string }, index) => (
            <BookCard
              book={book}
              selectedCategory={book.category}
              key={`${book.id}-${index}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BookmarksPage;
