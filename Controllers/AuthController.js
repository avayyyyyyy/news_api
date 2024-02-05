import prisma from "../DB/db.config.js";
import zod from "zod";
import { UserSchema } from "../Validations/UserValidationSchema.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    const already = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!already) {
      if (profile !== undefined) {
        const validatedInfo = UserSchema.safeParse({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          profile,
        });
      }

      const validatedInfo = UserSchema.safeParse({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });

      if (!validatedInfo) {
        res.json({
          success: false,
          message: "Wrong body sent!",
        });
      }

      const user = await prisma.users.create({
        data: { name, email, password: await bcrypt.hash(password, 10) },
      });

      res.status(200).json({
        success: true,
        message: "User Created Successful",
        User: user,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "User already exist",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error creating user",
    });
  }
};
