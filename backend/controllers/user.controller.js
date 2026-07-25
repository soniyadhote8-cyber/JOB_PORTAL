import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, pancard, adharcard, role } = req.body;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role ||
      !adharcard
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }


    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const existingAdharcard = await User.findOne({ adharcard });
    if (existingAdharcard) {
      return res.status(400).json({
        message: "Adhar Number already exists",
        success: false,
      });
    }
    const existingPancard = await User.findOne({ pancard });
    if (existingPancard) {
      return res.status(400).json({
        message: "PAN Number already exists",
        success: false,
      });
    }
    const file = req.file;
    if(!file){
        return res.status(400).json({
            message: "Profile image is required",
            success: false,
        });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //conver password to hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      adharcard,
      pancard,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully ${fullName}`,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error registering user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, adharcard, role } = req.body;

    if (!email || !password || !adharcard || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (user.adharcard !== adharcard) {
      return res.status(404).json({
        message: "Incrorrect email or password or Adhar Number",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    //check role correctly or not
    if (user.role !== role) {
      return res.status(403).json({
        message: " You don't have the necessary role to access this resource",
        success: false,
      });
    }

    //generate token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      adharcard: user.adharcard,
      pancard: user.pancard,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error login failed",
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error logout",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    console.log(fullName, email, phoneNumber, bio, skills);

    //cloudinary upload
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content,
    );

    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //update database profile
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      const skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }
    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalname = file.originalname;
    }

    //resume

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
};
