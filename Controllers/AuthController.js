import prisma from "../DB/db.config.js";
import zod from "zod";
import {
  UserSchema,
  loginSchema,
} from "../Validations/UserValidationSchema.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    const validatedInfo = UserSchema.safeParse({
      name,
      email,
      password,
      profile,
    });

    if (validatedInfo.success === true) {
      const already = await prisma.users.findUnique({
        where: { email: email },
      });
      if (!already) {
        const user = await prisma.users.create({
          data: { name, email, password: await bcrypt.hash(password, 10) },
          select: {
            name: true,
            email: true,
          },
        });
        res.status(200).json({
          success: true,
          message: "User Created Successful",
          User: user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User Already Exist!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error creating user",
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const verified = loginSchema.safeParse({
      email,
      password,
    });

    if (verified.success === false) {
      res.status(400).json({
        success: false,
        message: "Wrong Body Sent",
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "SignUp First",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Wrong input sent",
    });
  }
};
