import React, { useState } from 'react';
import '../css/Header.css';
import { FaShoppingBasket } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
// import { FaMoon } from "react-icons/fa"; // Kullanılmıyorsa silebilirsin

function Header() {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    const root = document.getElementById('root');
    if (theme) {
      root.style.backgroundColor = 'black';
      root.style.color = 'white';
    } else {
      root.style.backgroundColor = 'white';
      root.style.color = 'black';
    }
    setTheme(!theme);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>

      <div className='flex-row'>
        <img className='logo' src="src/images/Logo.png" alt="Logo" />
        <p className='logo-text'>E-Ticaret Sitesi</p>
      </div>

      <div className='flex-row'>
        <input className='search-input' type="text" placeholder='Bir Şeyler Ara!' />
        <div>
          <CiLight className='icons' onClick={changeTheme} />
          {/* <FaMoon className='icons' /> */}
          <FaShoppingBasket className='icons' />
        </div>
      </div>

    </div>
  );
}

export default Header;
