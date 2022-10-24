import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LINKS = [
  { href: '/', text: 'Books' },
  { href: '/bookmarks', text: 'Bookmarks' },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="py-6 shadow">
      <ul className="flex flex-row items-center container mx-auto">
        {LINKS.map((link, index) => (
          <li
            className={index === 0 ? 'mr-6' : ''}
            key={`${index}-${link.href}`}
          >
            <Link href={link.href} passHref>
              <a
                style={
                  router.pathname === link.href ? activeStyle : inActiveStyle
                }
              >
                {link.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

const activeStyle = { color: 'rgb(124 58 237)', fontWeight: 'bold' };
const inActiveStyle = { color: 'rgb(107 114 128)', fontWeight: 'normal' };
