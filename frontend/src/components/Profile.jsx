// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'
// import { useSelector } from 'react-redux'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// // const skills = ["Html", "Css", "Javascript", "Reactjs"]
// const isResume = true;

// const Profile = () => {
//     useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const {user} = useSelector(store=>store.auth);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//                 <div className='flex justify-between'>
//                     <div className='flex items-center gap-4'>
//                         <Avatar className="h-24 w-24">
//                             <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
//                         </Avatar>
//                         <div>
//                             <h1 className='font-medium text-xl'>{user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
//                 </div>
//                 <div className='my-5'>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div className='my-5'>
//                     <h1>Skills</h1>
//                     <div className='flex items-center gap-1'>
//                         {
//                             user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
//                         }
//                     </div>
//                 </div>
//                 <div className='grid w-full max-w-sm items-center gap-1.5'>
//                     <Label className="text-md font-bold">Resume</Label>
//                     {
//                         isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
//                     }
//                 </div>
//             </div>
//             <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//                 <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//                 {/* Applied Job Table   */}
//                 <AppliedJobTable />
//             </div>
//             <UpdateProfileDialog open={open} setOpen={setOpen}/>
//         </div>
//     )
// }

// export default Profile










import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import SavedJobTable from "./SavedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  useGetSavedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = Boolean(user?.profile?.resume);

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 min-h-screen">
      <Navbar />

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-yellow-400 rounded-2xl my-8 p-8 shadow-xl"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar className="h-24 w-24 ring-4 ring-yellow-400">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
            </motion.div>

            <div>
              <h1 className="font-bold text-2xl text-blue-900">
                {user?.fullname}
              </h1>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="border border-yellow-400 text-blue-900 hover:bg-yellow-400 hover:text-blue-900 transition-all"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        {/* CONTACT INFO */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-blue-900">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-blue-900">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* SKILLS */}
        <div className="my-6">
          <h1 className="font-semibold text-lg text-blue-900 mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }}>
                  <Badge className="bg-blue-900 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 cursor-pointer">
                    {skill}
                  </Badge>
                </motion.div>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* RESUME */}
        <div className="my-4">
          <Label className="text-blue-900 font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noreferrer"
              className="block text-yellow-500 hover:text-blue-900 hover:underline transition-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </motion.div>

      {/* APPLIED JOBS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-10"
      >
        <h1 className="font-bold text-lg text-blue-900 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-10"
      >
        <h1 className="font-bold text-lg text-blue-900 mb-4">Saved Jobs</h1>
        <SavedJobTable />
      </motion.div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
