import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

function Footer() {

const scrollToTop = () => {  

  window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

 }




  return (
    <footer className="bg-gray-900/90 backdrop-blur-sm text-gray-300 py-10 mt-20 border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo with glow effect */}
          <h2 className="text-3xl  text-white font-cinzel">CineWorld</h2>

          {/* Menu links with underline effect */}
          <ul className="flex items-center gap-4">
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "textBtn bg-gray-800 text-gray-400" : "textBtn"
        }
      >
        Filmlar
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/tv"
        className={({ isActive }) =>
          isActive ? "textBtn bg-gray-800 text-gray-400" : "textBtn"
        }
      >
        Seriallar
      </NavLink>
    </li>
  </ul>

          {/* Social icons */}
          <div onClick={scrollToTop} className="flex items-center textBtn gap-1.5">
         <button className=''> 
          Sayt boshiga qaytish
         </button>
         <IoIosArrowUp />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} CineWorld. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;