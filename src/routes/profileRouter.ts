import { Router } from "express";
import { changePassword, getProfile } from "../controllers/profileController";

const profileRouter = Router();

profileRouter.get('/', getProfile);
profileRouter.patch('/change-password', changePassword);

export default profileRouter;