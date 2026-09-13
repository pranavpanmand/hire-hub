
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import {
  Loader2,
  Upload,
  User,
  Mail,
  Phone,
  Lock,
  FileText,
  PenTool,
} from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    bio: "",
    skills: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("bio", input.bio); // Added Bio
    formData.append("skills", input.skills); // Added Skills

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

     if (res.data.success) {
       // 1. Redux Store update karein (User Login ho gaya)
       dispatch(setUser(res.data.user));

       // 2. Seedha Home Page par navigate karein (Login page par nahi)
       navigate("/");

       toast.success(res.data.message);
     }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto pt-10 pb-10 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl bg-white border border-gray-100 rounded-xl p-8 shadow-lg"
        >
          <div className="mb-6 text-center">
            <h1 className="font-bold text-3xl text-gray-900">Create Account</h1>
            <p className="text-sm text-gray-500 mt-2">
              Fill in your details to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Full Name */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="john@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="9876543210"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Additional Profile Details Section */}
          <div className="border-t border-gray-100 pt-4 mb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Bio */}
              <div className="space-y-1">
                <Label>Bio</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.bio}
                    name="bio"
                    onChange={changeEventHandler}
                    placeholder="Tell us about yourself..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <Label>Skills (Comma separated)</Label>
                <div className="relative">
                  <PenTool className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.skills}
                    name="skills"
                    onChange={changeEventHandler}
                    placeholder="React, Node.js, MongoDB"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role & File Upload */}
          <div className="flex flex-col md:flex-row gap-6 justify-between mt-4 bg-gray-50 p-4 rounded-lg">
            <RadioGroup className="flex flex-col gap-2 w-full md:w-1/2">
              <Label className="font-medium mb-1">I am a:</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4"
                  id="r1"
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4"
                  id="r2"
                />
                <Label htmlFor="r2" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>

            <div className="w-full md:w-1/2">
              <Label className="font-medium mb-1 flex items-center gap-1">
                Profile Photo
              </Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer text-sm bg-white"
              />
            </div>
          </div>

          {loading ? (
            <Button
              className="w-full my-6 bg-[#6A38C2] hover:bg-[#5b30a6]"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-6 bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              Signup
            </Button>
          )}

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6A38C2] font-semibold hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;