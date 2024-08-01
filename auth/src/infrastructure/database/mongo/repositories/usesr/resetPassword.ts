import { VerifyJwtToken } from "@/_lib/utils/services/token/verifyToken";
import { BadRequestError } from "@intellectaa/common";
import { findEamil } from "./findEmail";

export const resetPassword = async (payload: any) => {
  const { token, password } = payload;
  try {
    const verifiCation = VerifyJwtToken(token);
    const email = verifiCation.payload;
    const user = await findEamil(email);
    if (!user) {
      throw new BadRequestError("No User Found With Provided Email");
    }
    user.password = password;
    await user.save();
    return user;
  } catch (error: any) {
      if (error.name === "TokenExpiredError") {
          throw new BadRequestError("Token Expired");
        }
        throw new BadRequestError("token is not valid")
  }
};
