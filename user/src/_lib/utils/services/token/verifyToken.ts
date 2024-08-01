import { config } from "@/_boot/config";
import jwt from "jsonwebtoken";
export const VerifyJwtToken = (token: any):any => {
    try {
        
        return jwt.verify(token, config.secrets.access_token);
    } catch (error) {
        throw error
    }
     
};
