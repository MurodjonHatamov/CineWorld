import React from "react";
import { NavLink, Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition
     ${
       isActive
         ? "bg-white text-black"
         : "text-white/70 hover:text-white hover:bg-white/10"
     }`;

  return (
    <footer className="mt-24 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <Link to="/" className="select-none">
            <h2 className="text-2xl sm:text-3xl text-white font-cinzel tracking-wide">
              CineWorld
            </h2>
          </Link>

          {/* Navigation */}
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <NavLink to="/" className={navClass}>
                Filmlar
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv" className={navClass}>
                Seriallar
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={navClass}>
                Kategoriyalar
              </NavLink>
            </li>
          </ul>

          {/* Social + Top */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
              title="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="p-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
              title="Telegram"
            >
              <FaTelegramPlane />
            </a>

            <button
              onClick={scrollToTop}
              className="ml-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition active:scale-[0.97]"
            >
              Yuqoriga <IoIosArrowUp />
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} CineWorld. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/privacy"
              className="text-white/60 hover:text-white transition"
            >
              Privacy
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/terms"
              className="text-white/60 hover:text-white transition"
            >
              Terms
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/contact"
              className="text-white/60 hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
