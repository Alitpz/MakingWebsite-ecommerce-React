import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { FaShoppingBasket } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

function Header() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false;
  });

  // Sayfa yüklendiğinde tema attribute'unu set et
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); // Varsayılan olarak light
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const changeTheme = () => {
    setTheme(!theme);
  };

  return (
    <div className="header-container">
      <div className='flex-row'>
        <img className='logo' src="src/images/Logo.png" alt="Logo" />
        <p className='logo-text'>E-Ticaret Sitesi</p>
      </div>

      <div className='flex-row'>
        <input
          className='search-input'
          type="text"
          placeholder='Bir Şeyler Ara!'
        />
        <div>
          {theme ? (
            <CiLight className='icons' onClick={changeTheme} />
          ) : (
            <FaMoon className='icons' onClick={changeTheme} />
          )}
          <FaShoppingBasket className='icons' />
        </div>
      </div>
    </div>
  );
}

export default Header;
