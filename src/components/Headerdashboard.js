import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
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
          {/* {Cookies.get("token") && (
            <div className="flex md:order-2">
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  Cookies.remove("token");
                  navigate("/login");
                }}
              >
                <Link to={"/Login"}>Logout</Link>
              </button>
            </div>
          )} */}
        </div>
      </nav>
    </>
  );
};

export default Header;
