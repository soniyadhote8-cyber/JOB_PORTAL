import React, { useState } from "react";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/data";
import { toast } from "sonner";
import { Loader, Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    name: user?.fullName,
    email: user?.email,
    phone: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(",") || " ",
    file: user?.profile.resume,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file){
        formData.append("file", input.file);
    }
    try{
      setLoading(true);
        const res = await axios.post (`${USER_API_ENDPOINT}/profile/update`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
            withCredentials: true,
        });
        if (res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch(error){
        console.log(error);
        toast.error("Failed to update profile");
    }
    finally{
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  const FileChangehandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="z-50 bg-neutral-900 text-white p-6 sm:max-w[500px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          {/* Form for editing profile */}
          <form onSubmit={handleFileChange}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <input
                  type="text"
                  id="name"
                  value={input.name}
                  name="name"
                  onChange={changeEventHandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <input
                  type="email"
                  id="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <input
                  type="tel"
                  id="phone"
                  value={input.phone}
                  name="phone"
                  onChange={changeEventHandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <input
                  type="bio"
                  id="bio"
                  value={input.bio}
                  name="bio"
                  onChange={changeEventHandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* skills */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  value={input.skills}
                  name="skills"
                  onChange={changeEventHandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Resume File Upload */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resume" className="text-right">
                  Resume
                </Label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept="*/*"
                  onChange={FileChangehandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">{" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait{" "}</Button>
              ) : (
                <button type="submit" className="w-full my-4">
                  Save
                </button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileModal;
