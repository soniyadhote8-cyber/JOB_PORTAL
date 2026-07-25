import { JOB_API_ENDPOINT } from "@/data";
import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetAllAdminJobs() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
        setLoading(true);
        setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{
            withCredentials: true,
        });
        console.log("API Response", res.data);
        console.log("First Job", res.data.jobs[0]);
        console.log("createdAt", res.data.jobs[0]?.createdAt);
        
        
        
        if (res.data.status){
           dispatch(setAllAdminJobs(res.data.jobs));
        } else {
            setError("Failed to fetch jobs.")
        }
      } catch (error) {
        console.log(error);
        setError(error.message || "An error occured.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
  return { loading, error };
};



export default useGetAllAdminJobs
