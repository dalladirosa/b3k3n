import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getBooks } from 'api/books';
import { getCategories } from 'api/categories';
import { times } from 'lodash';
import flatten from 'lodash/flatten';

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
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { data: categories } = useQuery(['categories'], getCategories);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['categoryBooks', selectedCategory?.id],
    ({ pageParam, queryKey }) =>
      getBooks({
        categoryId: queryKey[1] as number,
        size: 16,
        page: pageParam?.page ?? 0,
      }),
    {
      enabled: !!selectedCategory?.id,
      refetchOnMount: true,
      getNextPageParam: (lastPage) => {
        return lastPage.length === 16 ? { page } : undefined;
      },
      onSuccess: () => {
        setPage((prevState) => prevState + 1);
      },
    }
  );

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const handleSelectCategory = (category: Category) => () => {
    setSelectedCategory(category);
    setPage(0);
  };

  return (
    <main className="my-12">
      <div className="grid gap-4 grid-cols-5">
        {categories?.map((category, index) => (
          <div
            key={category.id}
            className={`${
              COLORS[index]
            } p-4 rounded-lg text-[#333] text-sm w-full cursor-pointer h-[100px] ${
              selectedCategory?.id === category.id
                ? 'outline outline-offset-2 outline-2 outline-violet-500'
                : ''
            } `}
            onClick={handleSelectCategory(category)}
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 grid-cols-4">
        {isFetching && !isFetchingNextPage
          ? times(8, (index) => (
              <div key={index}>
                <Skeleton height={417} />
                <Skeleton height={16} width={180} />
                <Skeleton height={16} width={60} />
              </div>
            ))
          : flatten(data?.pages)?.map((book: Book, index: number) => {
              return (
                <BookCard
                  // ref={flatten(data?.pages).length === index + 1 ? ref : null}
                  book={book}
                  selectedCategory={selectedCategory}
                  key={`${book.id}-${index}`}
                />
              );
            })}
        {isFetchingNextPage &&
          times(8, (index) => (
            <div key={index}>
              <Skeleton height={417} />
              <Skeleton height={16} width={180} />
              <Skeleton height={16} width={60} />
            </div>
          ))}
        <div ref={ref} />
      </div>
    </main>
  );
}

export default HomePage;
