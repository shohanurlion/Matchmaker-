import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
      const result = await AuthServices.loginUser(req.body);
   const { refreshToken } = result;
   res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
   });

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
   const { refreshToken } = req.cookies;
   const result = await AuthServices.refreshToken(refreshToken);

    res.status(200).json({
        success: true,
        message: "Refresh Token Creat successfully",
        data: result,
    });
});

export const AuthController = {
    loginUser,
    refreshToken
};