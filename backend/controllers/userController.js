import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message: "Username already exist try different",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    




    await User.create({
        fullName,
        username,
        password: hashedPassword,
        profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
        gender
    })

    return res.status(200).json({
        message: "User created Successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
        message: "Failed to register"
    })
    
  }
};
