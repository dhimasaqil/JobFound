import React from "react";
import { Link } from "react-router-dom";

const Foo = () => {
  return (
    <>
      <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <span className="self-center text-xl font-bold color-font-semibold whitespace-nowrap dark:text-white">
              Jobs
            </span>
            <span className="self-center text-xl  color-font-semibold whitespace-nowrap dark:text-white">
              Found
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Job-vacancy" className="mr-4 hover:underline md:mr-6">
                Lowongan
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022 Developed by Dhimas Aqil Iqbal Mustaqim
        </span>
      </footer>
    </>
  );
};
export default Foo;
