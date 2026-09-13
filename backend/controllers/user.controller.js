import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//   try {
//     // 1. Accept bio and skills from req.body
//     const { fullname, email, phoneNumber, password, role, bio, skills } =
//       req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     // Handle File
//     const file = req.file;
//     let cloudResponse = null;
//     if (file) {
//       const fileUri = getDataUri(file);
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//     }
    

//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         message: "User already exist with this email.",
//         success: false,
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 2. Process Skills (String "HTML,CSS" -> Array ["HTML", "CSS"])
//     let skillsArray = [];
//     if (skills) {
//       skillsArray = skills.split(",");
//     }

//     // 3. Create User with Profile Data
//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         bio: bio || "", // Save Bio
//         skills: skillsArray, // Save Skills Array
//         profilePhoto: cloudResponse ? cloudResponse.secure_url : `https://ui-avatars.com/api/?name=${fullname.replace(" ", "+")}&background=random`,
//       },
//     });

//     return res.status(201).json({
//       message: "Account created successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

export const toggleSaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isSaved = user.profile.savedJobs.includes(jobId);
    if (isSaved) {
      // Unsave job
      user.profile.savedJobs = user.profile.savedJobs.filter(id => id.toString() !== jobId);
    } else {
      // Save job
      user.profile.savedJobs.push(jobId);
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: isSaved ? "Job unsaved successfully" : "Job saved successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate({
      path: 'profile.savedJobs',
      populate: {
        path: 'company',
        model: 'Company'
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      savedJobs: user.profile.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role, bio, skills } =
      req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const file = req.file;
    let cloudResponse = null;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",");
    }

    const profilePhoto = cloudResponse
      ? cloudResponse.secure_url
      : `https://ui-avatars.com/api/?name=${fullname.replace(" ", "+")}&background=random`;

    // 1. User Create karein
    let user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        bio: bio || "",
        skills: skillsArray,
        profilePhoto: profilePhoto,
      },
    });

    // --- YAHAN SE CHANGES HAIN (AUTO LOGIN LOGIC) ---

    // 2. Token Generate karein
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // 3. User object banayein response ke liye (Password hata ke)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // 4. Cookie set karein aur User return karein
    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Account created successfully.",
        user, // Frontend ko user data bhejna zaroori hai taaki Redux update ho sake
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;

//         const file = req.file;
//         // cloudinary ayega idhar
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // middleware authentication
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }
//         // updating data
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray

//         // resume comes later here...
//         if(cloudResponse){
//             user.profile.resume = cloudResponse.secure_url // save the cloudinary url
//             user.profile.resumeOriginalName = file.originalname // Save the original file name
//         }

//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully.",
//             user,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file; // This might be undefined if user didn't upload a file

    // 1. Get User ID first
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // 2. Update Text Fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    // 3. Handle File (Resume/Photo) ONLY IF file exists
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      // Assuming this is for Resume based on your variable names
      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
        user.profile.resumeOriginalName = file.originalname; // Save the original file name
      }
    }

    // 4. Save updated user
    await user.save();

    // 5. Return updated user object
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }

};


