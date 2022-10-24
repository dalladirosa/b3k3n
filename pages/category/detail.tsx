import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { VscChevronLeft } from 'react-icons/vsc';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getBooks } from 'api/books';
import { flatten, times } from 'lodash';

import BookCard from 'containers/home/BookCard';
import { Book } from 'interfaces/books.interface';

const CategoryDetailPage = () => {
  const router = useRouter();
  const categoryId = '';
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [category] = useState(getParameterByName('name'));

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['categoryBooks', categoryId],
      ({ pageParam, queryKey }) =>
        getBooks({
          categoryId: queryKey[1] as string,
          size: 16,
          page: pageParam?.page ?? 0,
        }),
      {
        enabled: !!categoryId,
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

  function getParameterByName(name: string) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData = flatten(data?.pages).filter((d) =>
    d.title.includes(search)
  );

  return (
    <>
      <div>
        <Link href="/" className="flex flex-row items-center text-gray-500">
          <VscChevronLeft className="mr-3" />
          <span>Back to categories</span>
        </Link>
        <h1 className="mt-6 font-semibold text-2xl">{category}</h1>
      </div>
      <label className="block relative mt-6">
        <MdSearch className="absolute top-2/4 left-[10px] -translate-y-2/4 text-slate-400" />
        <input
          className="border border-slate-200 placeholder:text-slate-400 rounded-md py-1 px-8"
          placeholder="Search book"
          onChange={handleChangeSearch}
        />
      </label>

      {!isFetching && !isFetchingNextPage && filteredData.length === 0 ? (
        <div className="text-gray-500 flex flex-col items-center justify-center text-2xl font-semibold flex-1">
          Try search another book...
        </div>
      ) : (
        <div className="mt-12 grid gap-6 grid-cols-4">
          {isFetching && !isFetchingNextPage
            ? times(8, (index) => (
                <div key={index}>
                  <Skeleton height={417} />
                  <Skeleton height={16} width={180} />
                  <Skeleton height={16} width={60} />
                </div>
              ))
            : filteredData?.map((book: Book, index: number) => {
                return (
                  <BookCard
                    ref={flatten(data?.pages).length === index + 1 ? ref : null}
                    book={book}
                    selectedCategory={category}
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
        </div>
      )}
    </>
  );
};

export default CategoryDetailPage;