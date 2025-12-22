import express, { Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post("/", userController.createAdmin);
router.post("/matchmaker",  auth(UserRole.ADMIN), userController.createMatchmaker);
router.get("/matchmakers", userController.getallMatchmakers);
router.delete("/matchmaker/:id", auth(UserRole.ADMIN), userController.deleteMatchmaker);
router.post("/normaluser", userController.creatNormaluser);
router.post("/matchmakerpost",  auth(UserRole.MATCHMAKER), userController.createMatchmakerpost);
router.patch("/matchmakerpost/:id", auth(UserRole.MATCHMAKER), userController.updateMatchmakerpost);
router.get("/matchmakerposts", auth(UserRole.MATCHMAKER), userController.getallMatchmakerposts);
router.delete("/matchmakerpost/:id", auth(UserRole.MATCHMAKER), userController.deleteMatchmakerpost);
router.get("/myprofile", auth(UserRole.ADMIN, UserRole.MATCHMAKER, UserRole.USER), userController.getMyprofile);
router.patch("/:id/status", auth(UserRole.ADMIN), userController.changeprofilestatus);
export const userRoutes = router;