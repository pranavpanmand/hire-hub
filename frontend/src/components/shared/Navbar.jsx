// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Button } from '../ui/button'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { LogOut, User2 } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const Navbar = () => {
//     const { user } = useSelector(store => store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setUser(null));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }
//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//                 <div>
//                     <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
//                 </div>
//                 <div className='flex items-center gap-12'>
//                     <ul className='flex font-medium items-center gap-5'>
//                         {
//                             user && user.role === 'recruiter' ? (
//                                 <>
//                                     <li><Link to="/admin/companies">Companies</Link></li>
//                                     <li><Link to="/admin/jobs">Jobs</Link></li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li><Link to="/">Home</Link></li>
//                                     <li><Link to="/jobs">Jobs</Link></li>
//                                     <li><Link to="/browse">Browse</Link></li>
//                                     <li> <Link to="/login"> LOGIN</Link></li>
//                                 </>
//                             )
//                         }

//                     </ul>
//                     {
//                         !user ? (
//                             <div className='flex items-center gap-2'>
//                                 <Link to="/login"><Button variant="outline">Login</Button></Link>
//                                 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
//                             </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="cursor-pointer">
//                                         <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                     </Avatar>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-80">
//                                     <div className=''>
//                                         <div className='flex gap-2 space-y-2'>
//                                             <Avatar className="cursor-pointer">
//                                                 <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                             </Avatar>
//                                             <div>
//                                                 <h4 className='font-medium'>{user?.fullname}</h4>
//                                                 <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
//                                             </div>
//                                         </div>
//                                         <div className='flex flex-col my-2 text-gray-600'>
//                                             {
//                                                 user && user.role === 'student' && (
//                                                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                         <User2 />
//                                                         <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
//                                                     </div>
//                                                 )
//                                             }

//                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                 <LogOut />
//                                                 <Button onClick={logoutHandler} variant="link">Logout</Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    // Added sticky, backdrop-blur and shadow for a "smooth" feel
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-12">
          <ul className="hidden md:flex font-medium items-center gap-5 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#F83002] transition-colors">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#F83002] transition-colors">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#F83002] transition-colors">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#F83002] transition-colors">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#F83002] transition-colors">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Authentication Logic */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-all">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border border-gray-200">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@user"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 border-none shadow-xl bg-white rounded-xl">
                <div>
                  <div className="flex gap-4 space-y-2 items-center">
                    <Avatar className="cursor-pointer h-10 w-10">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@user"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-500 truncate w-48">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4 gap-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-black transition-colors">
                        <User2 className="w-4 h-4" />
                        <Link to="/profile" className="text-sm font-medium">
                          View Profile
                        </Link>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer text-red-600 hover:text-red-700 transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span
                        onClick={logoutHandler}
                        className="text-sm font-medium cursor-pointer"
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;