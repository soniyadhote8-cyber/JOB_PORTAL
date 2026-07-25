import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { COMPANY_API_ENDPOINT } from "@/data";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { toast } from "sonner";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params._id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((state) => state.company) || {};
  console.log("Redux data..", singleCompany);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const changeFileHandler = (event) => {
    const file = event.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany?.file || null,
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-600 font-semibold"
              variant="outline"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold text-blue-600">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Company Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Company Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Company location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Company logo</Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
