import React from 'react';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { href: '/', text: 'Books' },
  { href: 'bookmarks', text: 'Bookmarks' },
];

const Navbar = () => {
  return (
    <nav className="py-6 shadow">
      <ul className="flex flex-row items-center container mx-auto">
        {LINKS.map((link, index) => (
          <li
            className={index === 0 ? 'mr-6' : ''}
            key={`${index}-${link.href}`}
          >
            <NavLink
              to={link.href}
              style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
              end
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

const activeStyle = { color: 'rgb(124 58 237)', fontWeight: 'bold' };
const inActiveStyle = { color: 'rgb(107 114 128)', fontWeight: 'normal' };
