import { Router } from "express";
import { LoginUser, createUser } from "../Controllers/AuthController.js";
const route = Router();

route.post("/api/signup", createUser);
route.post("/api/login", LoginUser);

export default route;
