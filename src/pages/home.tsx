import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getCategories } from 'api/categories';

const COLORS = [
  'bg-amber-200',
  'bg-lime-200',
  'bg-teal-200',
  'bg-violet-200',
  'bg-pink-200',
];

function HomePage() {
  const { data: categories } = useQuery(['categories'], getCategories);

  return (
    <div className="grid gap-4 grid-cols-2 my-auto">
      {categories?.map((category, index) => (
        <Link
          to={`/category/${category.id}?name=${encodeURIComponent(
            category.name
          )}`}
          key={category.id}
          className={`${
            COLORS[index]
          } p-4 rounded-lg text-[#333] text-base font-semibold w-full cursor-pointer h-[100px] hover:outline outline-offset-2 outline-2 outline-violet-500
           ${index === categories.length - 1 ? 'col-span-2' : ''}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
