import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboardlayout from "../Layout/Dashboardlayout";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Formdata = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  // const [input, setInput] = useState(null);
  const { idData } = useParams();

  const token = Cookies.get("token");
  const [input, setInput] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: 0,
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: 0,
    salary_max: 0,
  });
  const [currentId, setCurrentId] = useState(-1);
  const [fetchStatus, setFetchStatus] = useState(true);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "title") {
      setInput({ ...input, title: value });
    } else if (name === "job_description") {
      setInput({ ...input, job_description: value });
    } else if (name === "job_qualification") {
      setInput({ ...input, job_qualification: value });
    } else if (name === "job_type") {
      setInput({ ...input, job_type: value });
    } else if (name === "job_tenure") {
      setInput({ ...input, job_tenure: value });
    } else if (name === "job_status") {
      setInput({ ...input, job_status: value });
    } else if (name === "company_image_url") {
      setInput({ ...input, company_image_url: value });
    } else if (name === "company_city") {
      setInput({ ...input, company_city: value });
    } else if (name === "salary_min") {
      setInput({ ...input, salary_min: value });
    } else if (name === "salary_max") {
      setInput({ ...input, salary_max: value });
    } else {
      setInput({ ...input, company_name: value });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    let {
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = input;

    if (currentId === -1) {
      axios
        .post(
          "https://dev-example.sanbercloud.com/api/job-vacancy",
          {
            title,
            job_description,
            job_qualification,
            job_type,
            job_tenure,
            job_status,
            company_name,
            company_image_url,
            company_city,
            salary_min,
            salary_max,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
          navigate("/dashboard/list-job-vacancy");
        });
    } else {
      axios
        .put(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${currentId}`,
          {
            title,
            job_description,
            job_qualification,
            job_type,
            job_tenure,
            job_status,
            company_name,
            company_image_url,
            company_city,
            salary_min,
            salary_max,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setFetchStatus(true);
          navigate("/dashboard/list-job-vacancy");
        });
    }

    setCurrentId(-1);

    setInput({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: 0,
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: 0,
      salary_max: 0,
    });
    // navigate("/dashboard/list-job-vacancy");
  };

  const hitDetail = () => {
    axios
      .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
      .then((res) => {
        let data = res.data;
        setInput(data);
        console.log("log data", data);
      });
  };
  useEffect(() => {
    if (idData != undefined) {
      setCurrentId(idData);
      if (!input.title) {
        hitDetail();
      }
    }
    console.log(input);
  }, [input]);

  return (
    <Dashboardlayout>
      <form className="my-5 mx-5" onSubmit={handleSubmit}>
        <div>
          <div>
            <div className="flex flex-row mb-6">
              <div className="w-1/2 mr-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={handleInput}
                  value={input?.title}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  onChange={handleInput}
                  value={input?.company_name}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Company Image URL
            </label>
            <input
              type="text"
              name="company_image_url"
              onChange={handleInput}
              value={input?.company_image_url}
              className="block mb-6 p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Qualification
              </label>
              <input
                type="text"
                name="job_qualification"
                onChange={handleInput}
                value={input.job_qualification}
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Description
              </label>
              <input
                type="text"
                name="job_description"
                onChange={handleInput}
                value={input.job_description}
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex flex-row mb-6">
              <div className="w-1/2 mr-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Job Type
                </label>
                <input
                  type="text"
                  name="job_type"
                  onChange={handleInput}
                  value={input.job_type}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Job Tenure
                </label>
                <input
                  type="text"
                  name="job_tenure"
                  onChange={handleInput}
                  value={input.job_tenure}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-row mb-6">
              <div className="w-1/2 mr-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Company City
                </label>
                <input
                  type="text"
                  name="company_city"
                  onChange={handleInput}
                  value={input.company_city}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Job Status
                </label>
                <input
                  type="text"
                  name="job_status"
                  onChange={handleInput}
                  value={input.job_status}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-row mb-6">
              <div className="w-1/2 mr-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Minimum Salary
                </label>
                <input
                  type="text"
                  name="salary_min"
                  onChange={handleInput}
                  value={input.salary_min}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Maximum Salary
                </label>
                <input
                  type="text"
                  name="salary_max"
                  onChange={handleInput}
                  value={input.salary_max}
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Dashboardlayout>
  );
};

export default Formdata;
