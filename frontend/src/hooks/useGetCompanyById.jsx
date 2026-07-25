import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetCompanyById(companyId) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleCompany = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          },
        );
        

        console.log("API Response", res.data);
        console.log("First Job", res.data?.jobs?.[0]);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          setError("Failed to fetch company.");
        }
      } catch (error) {
        console.log(error);
        setError(error.message || "An error occured.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);

  return { loading, error };
}

export default useGetCompanyById;
