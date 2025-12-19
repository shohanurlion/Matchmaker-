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
    },
 
};