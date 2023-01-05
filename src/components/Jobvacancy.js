import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Label, TextInput, Button } from "flowbite-react";

const Jobvacancy = () => {
  const { functionHandle, state, navigation } = useContext(GlobalContext);
  const {
    handleDetail,
    handleSearch,
    handleChangeSearch,
    handleFilter,
    handleChangeFilter,
  } = functionHandle;
  const {
    data,
    setData,
    currentId,
    setCurrentId,
    search,
    setSearch,
    fetchStatus,
    setFetchStatus,
    filter,
    setFilter,
  } = state;

  const { navigate } = navigation;
  useEffect(
    (res) => {
      let fetchData = async () => {
        let { data } = await axios.get(
          "https://dev-example.sanbercloud.com/api/job-vacancy"
        );
        let dataJob = data.data;
        let result = dataJob.map((res) => {
          let {
            company_city,
            company_image_url,
            company_name,
            id,
            job_description,
            job_qualification,
            job_tenure,
            job_type,
            salary_max,
            salary_min,
            job_status,
          } = res;

          return {
            company_city,
            company_image_url,
            company_name,
            id,
            job_description,
            job_qualification,
            job_tenure,
            job_type,
            salary_max,
            salary_min,
            job_status,
          };
        });

        setData([...result]);
        // .then((res) => {
        //   setData([...res.data.data]);
        //   // console.log(res);
        // })
        // .catch((error) => {});
      };
      if (fetchStatus) {
        fetchData();
        setFetchStatus(false);
      }
    },
    [fetchStatus, setFetchStatus]
  );

  console.log(data);
  const truncateString = (string = "", maxLength = 40) =>
    string?.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

  return (
    <>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 flex items-center flex-col">
          <form className="w-3/4 " onSubmit={handleSearch}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
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
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <Accordion alwaysOpen={true} className="mx-auto w-3/4 mt-5">
            <Accordion.Panel>
              <Accordion.Title>Filter</Accordion.Title>
              <Accordion.Content>
                <form onSubmit={handleFilter} className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label value="Job Type" />
                    </div>
                    <TextInput
                      onChange={handleChangeFilter}
                      value={filter.job_type}
                      name="job_type"
                      type="text"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Company Name" />
                    </div>
                    <TextInput
                      onChange={handleChangeFilter}
                      value={filter.company_city}
                      name="company_city"
                      type="text"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Company City" />
                    </div>
                    <TextInput
                      onChange={handleChangeFilter}
                      value={filter.company_name}
                      type="text"
                      name="company_name"
                    />
                  </div>
                  <div className="flex">
                    <Button type="submit" className="w-1/2 mr-2">
                      Filter
                    </Button>
                    <Button
                      onClick={() => setFetchStatus(true)}
                      type="Reset"
                      className="text-white bg-red-700 hover:bg-red-800 w-1/2"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </form>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
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
                <Link onClick={handleDetail} value={res.id}>
                  <img
                    className="rounded-t-lg h-64 w-full object-cover"
                    src={res.company_image_url}
                    alt=""
                  />
                </Link>
                <div className="p-5">
                  <Link onClick={handleDetail} value={res.id}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {res.title}
                    </h5>
                  </Link>
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
                  <p>Qualification :</p>
                  <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    {truncateString(res.job_qualification)}
                  </p>
                  <p>Description :</p>
                  <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    {truncateString(res.job_description)}
                  </p>
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

export default Jobvacancy;
