import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import { jwtHelpars } from "../../../helpars/jwtHelpars";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
const loginUser = async (playload: {
    email: string;
    password: string;
}) => {
const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: playload.email,
            status: UserStatus.ACTIVE,
        },
        
        
        include: {
            Matchmaker: true,
        }
    });
    const isCorrectPassword: boolean = await bcrypt.compare(playload.password, userData.password);
    if(!isCorrectPassword){
        throw new Error('Invalid password');
    }
    const accessToken = jwtHelpars.generateToken({
        name:userData.Matchmaker?.name,
        email: userData.email,
        role: userData.role,
    }, 
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_In as string
    );


    const refreshToken = jwtHelpars.generateToken({
        name:userData.Matchmaker?.name,
        email: userData.email,
        role: userData.role,
    },
     config.jwt.refresh_Token_Secret as Secret,
     config.jwt.refresh_Token_ExpiresIn as string
    );

    return {
        accessToken,
        refreshToken,
    };
};


const refreshToken = async (token: string) => {
       let decodedToken
    try {
        decodedToken = jwtHelpars.verifyToken(token, config.jwt.refresh_Token_Secret as Secret);
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedToken.email,
            status: UserStatus.ACTIVE,
        },
    });

     const accessToken = jwtHelpars.generateToken({
        email: userData.email,
        role: userData.role,
    }, 
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_In as string
    );
       return {
        accessToken,
    };

}

export const AuthServices = {
    loginUser,
    refreshToken
}