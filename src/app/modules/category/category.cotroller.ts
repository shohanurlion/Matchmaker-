import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { get } from "http";
const createCategory = async (req: Request, res: Response) => {
        const result = await categoryService.creatcategory(req);
        res.status(200).json({
            success: true,
            message: "Category Created successfuly!",
            data: result
        })   
};

const getCatergories = async (req: Request, res: Response) => {
    const result = await categoryService.getCatergories();
    res.status(200).json({
        success: true,
        message: "Categories retrieved successfully!",
        data: result
    })   
}
const getpostbycategory = async (req: Request, res: Response) => {
    const categoryId =  req.params.categoryId;
    console.log(categoryId);
    const result = await categoryService.getpostbycategory(categoryId);
    res.status(200).json({
        success: true,
        message: "Posts retrieved successfully!",
        data: result
    })   
}

export const categoryController = {
    createCategory,
    getCatergories,
    getpostbycategory
}