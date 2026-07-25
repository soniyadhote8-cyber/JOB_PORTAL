import { COMPANY_API_ENDPOINT } from "@/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";

const usegetAllCompanies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log("API Response", res.data);

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          setError("Failed to fetch companies.");
        }
      } catch (error) {
        console.log("API Error:", error);
        setError(error.message || "An error occured.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [dispatch]);
  return { loading, error };
};

export default usegetAllCompanies;
