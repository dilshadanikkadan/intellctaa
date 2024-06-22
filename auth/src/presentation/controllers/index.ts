import { IDependencies } from "@/application/interfaces/IDependencies";
import { createUserController } from "./createUser";
import { verifyOtpController } from "./verifyOtp";
import { refreshTokenController } from "./refreshToken";
import { logoutController } from "./logout";
import { googleSignUpController } from "./googleSignup";
import { resentOtpController } from "./resentOtp";
import { forgotPasswordController } from "./forgotPassword";
import { resetPasswordController } from "./resetPassword";
import { loginController } from "./login";

export const controllers = (dependencies: IDependencies) => {
    return {
        creatUser: createUserController(dependencies),
        verifyOtp:verifyOtpController(dependencies),
        refreshToken:refreshTokenController(dependencies),
        logout:logoutController(dependencies),
        googleAuth:googleSignUpController(dependencies),
        resentOtp:resentOtpController(dependencies),
        forgotPassword:forgotPasswordController(dependencies),
        resetPassword:resetPasswordController(dependencies),
        login:loginController(dependencies)
    }
};