import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expires_In: process.env.EXPIRES_IN,
        refresh_Token_Secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_Token_ExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        reset_Password_Secret: process.env.PASSWORD_RESET_SECRET,
        reset_Password_ExpiresIn: process.env.PASSWORD_RESET_EXPIRES_IN
    },
    reset_pass_link: process.env.RESET_PASSWORD_URL,
    emailSender: {
        email: process.env.EMAIL_USER,
        app_pass: process.env.EMAIL_PASS,
    },
};