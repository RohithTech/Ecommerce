import Logins from "../models/LoginSchema.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OTP from "../models/OtpSchema.mjs";
import transporter from "../config/mail.js";
import 'dotenv/config'


export const signUpController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Logins.findOne({ Email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = await Logins.create({
      Name: name,
      Email: email,
      Password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.Email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.Name,
        email: user.Email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const inputPassword = String(password);

  try {
    const user = await Logins.findOne({ Email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(inputPassword, user.Password);

    if (!isMatch) {
      return res.status(400).send("Invalid Password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.Email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    const userData = {
      id: user._id,
      name: user.Name,
      email: user.Email,
      role:user.role
    };

    return res.status(200).json({
      success: true,
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  const { email, otp, password } = req.body;
    const oncepass = String(otp);
  try {
    const findotp = await OTP.findOne({
      email,
      otp:oncepass
    });

    if (!findotp) {
      return res.status(404).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    if (findotp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        error: "OTP Expired",
      });
    }

    const user = await Logins.findOne({
      Email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Account Not Found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      String(password),
      10
    );

    await Logins.findOneAndUpdate(
      { Email: email },
      {
        $set: {
          Password: hashedPassword,
        },
      }
    );

    await OTP.deleteOne({
      _id: findotp._id,
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
        // Destructure email from query parameters
        const { email } = req.query; 

        // Find the specific user matching the email
        const readUser = await Logins.findOne({ Email: email });

        if (!readUser) {
            return res.status(404).json({success:false ,message:"User not found"});
        }

        return res.status(200).json({success:true ,message:"User found"});
    }
    catch (err) {
        return res.status(500).send("Error fetching data");
    }
};

export const sendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const onetimepass = await OTP.create({
      email,
      otp,
      purpose: "signup",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const mail = await transporter.sendMail({
      from: "t.rohith2196@gmail.com",
      to: email,
      subject: "Ecommerce OTP Verification",
      html: `
       <div style=" max-width:600px;
        margin:0 auto; font-family:Arial, sans-serif; 
        background:#ffffff; border:1px solid #e5e7eb; "> 
        <div style=" background:#dff5e2; 
        padding:40px 20px; text-align:center; "> 
        <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt="OTP Verification" width="180" style="display:block;margin:0 auto;" /> </div> <div style=" padding:40px 30px; text-align:center; "> <h2 style=" color:#111827; margin-bottom:20px; "> Your one-time code is </h2> <div style=" display:inline-block; padding:15px 50px; border:2px solid #222; font-size:32px; font-weight:bold; letter-spacing:6px; margin:20px 0; "> ${otp} </div> <p style=" color:#4b5563; line-height:1.8; font-size:15px; margin-top:25px; "> Please verify you're really you by entering this 6-digit code when you sign in. </p> <p style=" color:#ef4444; font-size:14px; font-weight:600; "> This code will expire in 5 minutes. </p> </div> <div style=" background:#f9fafb; text-align:center; padding:15px; color:#6b7280; font-size:12px; "> © 2026 Ecommerce Store. All rights reserved. </div> </div> `,
    });

    res.status(200).json({
      success: true,
      message: "OTP Sent",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
