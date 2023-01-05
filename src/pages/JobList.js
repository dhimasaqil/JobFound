import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Table from "../components/Tabledashboard";
import Dashboardlayout from "../Layout/Dashboardlayout";
import Formdata from "../components/Formdata";
import Cookies from "js-cookie";
import { GlobalContext } from "../Context/GlobalContext";

const JobList = () => {
  // const [data, setData] = useState(null);
  // const [currentId, setCurrentId] = useState(-1);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(null);
  // const [fetchStatus, setFetchStatus] = useState(true);
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
  const token = Cookies.get("token");

  useEffect(() => {
    fetchData();
    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);
  const fetchData = async () => {
    try {
      axios
        .get("https://dev-example.sanbercloud.com/api/job-vacancy")
        .then((res) => {
          setData([...res.data.data]);
          console.log(res.data);
        });
    } catch {}
  };

  const hitData = async (idData) => {
    try {
      axios
        .get(
          ` https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`
          // {},
          // { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          setValue(res);
        });
    } catch {}
  };
  const handleEdit = (idData) => {
    hitData(idData);
    setEdit(true);
  };
  const handleDelete = (idData) => {
    axios
      .delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFetchStatus(true);
        fetchData();
      });
  };
  console.log(data);
  const truncateString = (string = "", maxLength = 10) =>
    string?.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

  return (
    <>
      <Dashboardlayout>
        {edit ? (
          <Formdata />
        ) : (
          <Table
            data={data}
            truncateString={truncateString}
            setEdit={handleEdit}
            handleDelete={handleDelete}
            setData={setData}
            state={state}
            functionHandle={functionHandle}
          />
        )}
      </Dashboardlayout>
    </>
  );
};

export default JobList;
