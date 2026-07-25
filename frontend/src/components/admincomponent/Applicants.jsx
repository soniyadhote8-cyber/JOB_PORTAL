import React, { useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/data";
import { useParams } from "react-router-dom";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          },
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <div className="overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
