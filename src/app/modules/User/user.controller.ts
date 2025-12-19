import { Request, Response } from "express";
import { userService } from "./user.sevice";

const createAdmin = async (req: Request, res: Response) => {
        const result = await userService.createAdmin(req);
        res.status(200).json({
            success: true,
            message: "User Created successfuly!",
            data: result
        })   
};

const createMatchmaker = async (req: Request, res: Response) => {
    const result = await userService.createMatchmaker(req);
    res.status(200).json({
        success: true,
        message: "Matchmaker Created successfuly!",
        data: result
    })   
}
const getallMatchmakers = async (req: Request, res: Response) => {
    const result = await userService.getallMatchmakers();
    res.status(200).json({
        success: true,
        message: "Matchmakers retrieved successfully!",
        data: result
    })   
}
const deleteMatchmaker = async (req: Request, res: Response) => {
    const matchmakerId = req.params.id;
    const result = await userService.deleteMatchmaker(matchmakerId);
    res.status(200).json({
        success: true,
        message: "Matchmaker deleted successfully!",
        data: result
    })   
}

const creatNormaluser = async (req: Request, res: Response) => {
    const result = await userService.creatNormaluser(req);
    res.status(200).json({
        success: true,
        message: "Normal User Created successfuly!",
        data: result
    })   
}
const createMatchmakerpost = async (req: Request, res: Response) => {
    const result = await userService.createMatchmakerpost(req);
    res.status(200).json({
        success: true,
        message: "Matchmaker Post Created successfuly!",
        data: result
    })   
}
const getallMatchmakerposts = async (req: Request, res: Response) => {
    const result = await userService.getallMatchmakerposts(req);
    res.status(200).json({
        success: true,
        message: "Matchmaker Posts retrieved successfully!",
        data: result
    })   
}
const deleteMatchmakerpost = async (req: Request, res: Response) => {
    const matchmakerpostId = req.params.id;
    const result = await userService.deleteMatchmakerpost(matchmakerpostId);
    res.status(200).json({
        success: true,
        message: "Matchmaker Post deleted successfully!",
        data: result
    })   
}
const changeprofilestatus = async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await userService.changeprofilestatus(id, req.body);
    res.status(200).json({
        success: true,
        message: "User profile status updated successfully!",
        data: result
    })   
}
const getMyprofile = async (req: Request, res: Response) => {
    const result = await userService.getMyprofile(req);
    res.status(200).json({
        success: true,
        message: "User profile retrieved successfully!",
        data: result
    })   
}
export const userController = {
    createAdmin,
    createMatchmaker,
    creatNormaluser,
    createMatchmakerpost,
    getallMatchmakers,
    getallMatchmakerposts,
    deleteMatchmaker,
    deleteMatchmakerpost,
    getMyprofile,
    changeprofilestatus
}