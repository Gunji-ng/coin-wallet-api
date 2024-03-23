import { Router } from "express";
import { changePassword, getProfile } from "../controllers/profileController";

const profileRouter = Router();

export default profileRouter.get('/', getProfile).patch('/change-password', changePassword);