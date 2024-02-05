import { Router } from "express";
import { createUser } from "../Controllers/AuthController.js";
const route = Router();

route.post("/api/create", createUser);

export default route;
