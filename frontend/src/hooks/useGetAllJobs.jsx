import { JOB_API_ENDPOINT } from "@/data";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          },
        );
        console.log("API Response", res.data);
        console.log("First Job", res.data.jobs[0]);
        console.log("createdAt", res.data.jobs[0]?.createdAt);

        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.log(error);
        setError(error.message || "An error occured.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
  return { loading, error };
}

export default useGetAllJobs;
