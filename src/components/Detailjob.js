import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Detailjob = () => {
  //Inisialisasi
  let { idData } = useParams();
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState({
    title: "",
    company: "",
    image: "",
    qualification: "",
    description: "",
    type: "",
    status: 0,
    tenure: "",
    city: "",
    min: 0,
    max: 0,
  });

  //Fetching 1 Data
  useEffect(() => {
    if (idData !== null) {
      axios
        .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
        .then((res) => {
          let data = res.data;
          setDetail({
            title: data.title,
            image: data.company_image_url,
            company: data.company_name,
            qualification: data.job_qualification,
            description: data.job_description,
            type: data.job_type,
            status: data.job_status,
            tenure: data.job_tenure,
            city: data.company_city,
            min: data.salary_min,
            max: data.salary_max,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap shadow-lg">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={detail.image}
            />
            <div className="lg:w-1/2 w-full  h-full lg:py-6 px-5 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {detail.company}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {detail.title}
              </h1>
              <p className="font-bold mt-3">Qualification :</p>
              <p className="leading-relaxed">{detail.qualification}</p>
              <p className="font-bold mt-3">Description :</p>
              <p className="leading-relaxed">{detail.description}</p>
              <p className="font-bold mt-3">
                Salary : Rp. {detail.min} - Rp. {detail.max}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="text-sm mr-2 font-bold">
                    Lokasi : {detail.city} |{" "}
                  </span>
                  <span className="text-sm mr-2 font-bold">
                    Job Type : {detail.type} |
                  </span>
                  <span className="text-sm mr-2 font-bold">
                    Job tenure : {detail.tenure}
                  </span>
                </div>
              </div>
              <div className="flex">
                <button className="flex w-full p-auto ml-auto text-white bg-blue-700 border-0 py-2 px-52 focus:outline-none hover:bg-blue-800 rounded">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detailjob;
