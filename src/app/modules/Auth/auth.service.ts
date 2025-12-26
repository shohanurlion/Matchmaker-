import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import { jwtHelpars } from "../../../helpars/jwtHelpars";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "./emailSender";
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

const changePassword = async (user:any, playload:any) => {
    const { oldPassword, newPassword } = playload;
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
           email: user.email,  
            status: UserStatus.ACTIVE,
        },
    });
    const isCorrectPassword: boolean = await bcrypt.compare(oldPassword, userData.password);
    if(!isCorrectPassword){
        throw new Error('Invalid old password');
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: {
            email: user.email,
        },
        data: {
            password: hashedNewPassword,
        },
    });
};

const forgotPassword = async (playload : {email: string}) =>{
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: playload.email,  
            status: UserStatus.ACTIVE,   
         }
    });

    const restPasswordToken = jwtHelpars.generateToken({
        email: userData.email,
        role: userData.role,
    },
     config.jwt.reset_Password_Secret as Secret,
     config.jwt.reset_Password_ExpiresIn as string
    );

    const resetPassLink = config.reset_pass_link + `?userId=${userData.id}&token=${restPasswordToken}`;
        await emailSender(
        userData.email,
        `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
    )
};

const resetPassword = async (token: string, payload: { id: string, password: string }) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id: payload.id,
            status: UserStatus.ACTIVE
        }
    });

    const isValidToken = jwtHelpars.verifyToken(token, config.jwt.reset_Password_Secret as Secret);

    if (!isValidToken) {
        throw new Error('Invalid or expired password reset token');
    }

    // hash password
    const password = await bcrypt.hash(payload.password, 12);

    // update into database
    await prisma.user.update({
        where: {
            id: payload.id
        },
        data: {
            password
        }
    })
};

export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
}