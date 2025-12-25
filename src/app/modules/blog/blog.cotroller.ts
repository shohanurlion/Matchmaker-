import { Request, Response } from "express";
import { get } from "http";
import { blogService } from "./blog.service";
const createBlog = async (req: Request, res: Response) => {
    const result = await blogService.creatBlog(req);
    res.status(200).json({
        success: true,
        message: "Blog Created successfuly!",
        data: result
    })   
};

const updateBlog = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    const data = req.body;
    const result = await blogService.updateBlog(blogId, data);
    res.status(200).json({
        success: true,
        message: "Blog Updated successfuly!",
        data: result
    })   
};
const deleteBlog = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    const result = await blogService.deleteBlog(blogId);
    res.status(200).json({
        success: true,
        message: "Blog Deleted successfuly!",
        data: result
    })   
};

const getBlogsByAdmin = async (req: Request, res: Response) => {
    const result = await blogService.getBlogsByAdmin(req);
    res.status(200).json({
        success: true,
        message: "Blogs retrieved successfully!",
        data: result
    })   
}

const getallBlogs = async (req: Request, res: Response) => {
    const result = await blogService.getallBlogs();
    res.status(200).json({
        success: true,
        message: "All Blogs retrieved successfully!",
        data: result
    })   
}

export const BlogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByAdmin,
    getallBlogs
}