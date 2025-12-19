import jwt, { Secret } from 'jsonwebtoken';
const generateToken = (payload: object, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(
        payload, 
        secret as jwt.Secret,
         {
        algorithm: 'HS256',
        expiresIn,
       }
);
    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    const decoded =  jwt.verify(token, secret) as jwt.JwtPayload;
    return decoded;
}

export const jwtHelpars = {
    generateToken,
    verifyToken,
};