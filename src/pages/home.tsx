import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getBooks } from 'api/books';
import { getCategories } from 'api/categories';

import BookCard from 'containers/home/BookCard';
import { Book } from 'interfaces/books.interface';
import { Category } from 'interfaces/categories.interface';

const COLORS = [
  'bg-amber-200',
  'bg-lime-200',
  'bg-teal-200',
  'bg-violet-200',
  'bg-pink-200',
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { data: categories } = useQuery(['categories'], getCategories);

  const { data: books } = useQuery(
    ['categoryBooks', selectedCategory?.id],
    ({ queryKey }) => getBooks({ categoryId: queryKey[1] as number, size: 8 }),
    { enabled: !!selectedCategory?.id }
  );

  const handleSelectCategory = (category: Category) => () => {
    setSelectedCategory(category);
  };

  return (
    <main className="my-12">
      <div className="grid gap-4 grid-cols-5">
        {categories?.map((category, index) => (
          <div
            key={category.id}
            className={`${COLORS[index]} p-4 rounded-lg text-[#333] text-sm w-full cursor-pointer h-[100px]`}
            onClick={handleSelectCategory(category)}
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 grid-cols-4">
        {books?.map((book: Book, index: number) => (
          <BookCard
            book={book}
            selectedCategory={selectedCategory}
            key={`${book.id}-${index}`}
          />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
