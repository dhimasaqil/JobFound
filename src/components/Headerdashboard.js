import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Navbar Dashboard */}
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="flex items-center">
            <Link to="/">
              <span className="self-center text-xl font-bold color-font-semibold whitespace-nowrap dark:text-white">
                Jobs
              </span>
              <span className="self-center text-xl  color-font-semibold whitespace-nowrap dark:text-white">
                Found
              </span>
            </Link>
          </span>
          <div className="flex md:order-2">
            <img
              class="w-10 h-10 rounded-full"
              src="/docs/images/people/profile-picture-5.jpg"
              alt="Rounded avatar"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
