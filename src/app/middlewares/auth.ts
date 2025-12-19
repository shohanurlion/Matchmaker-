import { NextFunction, Request, Response } from "express";
import { jwtHelpars } from "../../helpars/jwtHelpars";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

const auth = (...roles: string[]) =>{
    return (req: Request & {user?:any}, res: Response, next: NextFunction) => {
      try{
        const token = req.headers.authorization 
        if(!token){
             throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!")
        }
        const varifiedToken = jwtHelpars.verifyToken(token, config.jwt.jwt_secret as Secret);
        req.user = varifiedToken;
        if(roles.length && !roles.includes(varifiedToken.role)){
            throw new Error('Unauthorized');
        }
        next(); 
      }
        catch(err){ 
            next(err);

    }
}
};

export default auth;