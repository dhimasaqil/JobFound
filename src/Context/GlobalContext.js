import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(-1);
  const [data, setData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);

  const handleDetail = (event) => {
    let idData = parseInt(event.target.value);
    setCurrentId(idData);
    navigate(`/Job-vacancy/${idData}`);
  };

  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => setSearch(event.target.value);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(search);
    let fetchData = async () => {
      let { data } = await axios.get(
        "https://dev-example.sanbercloud.com/api/job-vacancy"
      );
      let listData = data.data;
      console.log(listData);

      let searchData = listData.filter((res) => {
        // console.log(res.title);
        return res.title.toLowerCase().includes(search.toLowerCase());
        // Object.values(res).join(" ").toLowerCase().includes(search.toLowerCase())
      });
      console.log(searchData);
      setData([...searchData]);
    };

    fetchData();
  };
  const [filter, setFilter] = useState({
    job_type: "",
    company_city: "",
    company_name: "",
  });
  const handleFilter = (event) => {
    event.preventDefault();
    console.log(filter);
    let fetchData = async () => {
      let { data } = await axios.get(
        "https://dev-example.sanbercloud.com/api/job-vacancy"
      );
      let listData = data.data;
      console.log(listData);

      let filterData = listData.filter((res) => {
        // console.log(res.title);
        return (
          res.job_type === filter.job_type ||
          res.company_city === filter.company_city ||
          res.company_name === filter.company_name
        );
        // Object.values(res).join(" ").toLowerCase().includes(search.toLowerCase())
      });
      console.log(filterData);
      setData([...filterData]);
    };

    fetchData();
  };
  const handleChangeFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };
  const functionHandle = {
    handleDetail,
    handleSearch,
    handleChangeSearch,
    handleFilter,
    handleChangeFilter,
  };
  const state = {
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
  };
  const navigation = {
    navigate,
  };

  return (
    <GlobalContext.Provider
      value={{
        functionHandle,
        state,
        navigation,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
