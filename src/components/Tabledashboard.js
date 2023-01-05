import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Label, TextInput, Button } from "flowbite-react";

const Table = (props) => {
  const { state, functionHandle, truncateString, setEdit, handleDelete } =
    props;
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

  let navigate = useNavigate();

  const { idData } = useParams();

  const navigateForm = (idData) => {
    navigate(`/Dashboard/list-job-vacancy/form/${idData}`);
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        <form className="w-full  mx-auto mt-3" onSubmit={handleSearch}>
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
        <Accordion alwaysOpen={true} className="mx-auto  mt-5">
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
      <table className="mt-3  mx-auto w-11/12 text-xs text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-blue-700 text-gray-300 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-1 px-4">
              Name
            </th>
            <th scope="col" className="py-1 px-4">
              Company
            </th>
            <th scope="col" className="py-1 px-4">
              Location
            </th>
            <th scope="col" className="py-1 px-4">
              Job Type
            </th>
            <th scope="col" className="py-1 px-4">
              Job Tenure
            </th>
            <th scope="col" className="py-1 px-4">
              Job Description
            </th>
            <th scope="col" className="py-1 px-4">
              Job Qualification
            </th>
            <th scope="col" className="py-1 px-4">
              Minimum Salary
            </th>
            <th scope="col" className="py-1 px-4">
              Maximum Salary
            </th>
            <th scope="col" className="py-1 px-4">
              Job Status
            </th>
            <th scope="col" className="py-1 px-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data !== null &&
            data.map((res) => {
              return (
                <tr
                  key={res.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-1 px-4">{res.title}</td>
                  <td className="py-1 px-4">{res.company_name}</td>
                  <td className="py-1 px-4">{res.company_city}</td>
                  <td className="py-1 px-4">{res.job_type}</td>
                  <td className="py-1 px-4">{res.job_tenure}</td>
                  <td className="py-1 px-4">
                    {truncateString(res.job_description)}
                  </td>
                  <td className="py-1 px-4">
                    {truncateString(res.job_qualification)}
                  </td>
                  <td className="py-1 px-4">Rp. {res.salary_min}</td>
                  <td className="py-1 px-4">Rp. {res.salary_max}</td>

                  <td className="py-1 px-4">
                    {res.job_status === 1 ? "Open" : "Close"}
                  </td>
                  <td className="py-1 px-4">
                    <Link
                      to={`/Dashboard/list-job-vacancy/form/${res.id}`}
                      className="font-medium text-blue-600 mr-5 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => {
                        handleDelete(res.id);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
