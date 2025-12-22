import express, { Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { categoryController } from './category.cotroller';

const router = express.Router();
router.post("/creatcategory", categoryController.createCategory);
router.get("/getcategories", categoryController.getCatergories);
router.get("/getpostbycategory/:categoryId", categoryController.getpostbycategory);
export const categoryRoutes = router;