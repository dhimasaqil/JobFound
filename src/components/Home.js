import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

const Home = () => {
  const { functionHandle, state, navigation } = useContext(GlobalContext);

  // let navigate = useNavigate();
  const { handleDetail, handleSearch, handleChangeSearch } = functionHandle;
  const { data, setData, currentId, setCurrentId, search, setSearch } = state;
  const { navigate } = navigation;

  useEffect(() => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setData([...res.data.data]);
        // console.log(res);
      })
      .catch((error) => {});
  }, []);
  // console.log(data);

  return (
    <>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 flex items-center flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-center">Find your dream job</span>
            <span className="block  text-center text-indigo-600">
              more easily
            </span>
          </h2>
          <form className="w-3/4 mt-10" onSubmit={handleSearch}>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                onChange={handleChangeSearch}
                value={search}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Find Jobs Opportunity"
                // required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto flex-wrap flex gap-10 items-center justify-start max-w-7xl py-12 px-4">
        {data !== null &&
          data.map((res) => {
            return (
              <div
                className="max-w-sm w-1/3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                key={res.id}
              >
                <img
                  className="rounded-t-lg  h-64 w-full object-cover"
                  src={res.company_image_url}
                  alt=""
                />

                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {res.title}
                  </h5>
                  <div className="flex flex-row">
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                      {res.job_type}
                    </p>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                      , {res.job_tenure}
                    </p>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                      , {res.company_name}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-400">
                      {res.company_city}
                    </p>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                      , Rp. {res.salary_min} - Rp. {res.salary_max}
                    </p>
                  </div>

                  <button
                    onClick={handleDetail}
                    value={res.id}
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
