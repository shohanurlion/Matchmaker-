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

const changePassword = catchAsync(async (req: Request & {user?:any}, res: Response)  => {
    const user = req.user;
   const result = await AuthServices.changePassword(user, req.body);

    res.status(200).json({
        success: true,
        message: "Password changed successfully",
        data: result,
    });
});

const forgotPassword = catchAsync(async (req: Request, res: Response)  => {
   const result = await AuthServices.forgotPassword(req.body);
    res.status(200).json({
        success: true,
        message: "Password reset link sent to email successfully",
        data: result,
    });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization || "";

    await AuthServices.resetPassword(token, req.body);

    res.status(200).json({
        success: true,
        message: "Password reset successfully",
    });
});

export const AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};