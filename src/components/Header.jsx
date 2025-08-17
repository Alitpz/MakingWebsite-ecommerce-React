import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { FaShoppingBasket } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

function Header() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false;
  });

  const { totalQuantity } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

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
        <img className='logo' src="/Logo.png" alt="Logo" />
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
          <div className="cart-icon-container" onClick={handleCartClick}>
            <FaShoppingBasket className='icons' />
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
