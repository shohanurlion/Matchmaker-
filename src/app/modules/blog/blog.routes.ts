import { create } from 'domain';
import express, { Request, Response } from 'express';
import { BlogController } from './blog.cotroller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();
router.post("/creatblog", auth(UserRole.ADMIN), BlogController.createBlog);
router.patch("/updateblog/:blogId", auth(UserRole.ADMIN), BlogController.updateBlog);
router.delete("/deleteblog/:blogId", auth(UserRole.ADMIN), BlogController.deleteBlog);
router.get("/getblogsbyadmin", auth(UserRole.ADMIN), BlogController.getBlogsByAdmin);
router.get("/getallblogs", BlogController.getallBlogs);
export const blogRoutes = router;