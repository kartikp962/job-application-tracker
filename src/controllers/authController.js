import { createUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Mandatory fields are missing in the request!",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists in the database!",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await createUser({ name, email, passwordHash });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error("Signup failed: ", error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password_hash);

  if(!isPasswordMatching) {
    return res.status(401).json({
      message: 'Invalid email or password.'
    })
  }
}

export { signup, login };
