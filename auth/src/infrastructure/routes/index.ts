import { validateLogin } from "@/_lib/utils/services/validation/login.validation";
import { validateSignUP } from "@/_lib/utils/services/validation/signup.validation";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import {  validateRequest } from "@intellectaa/common";
import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const {
    creatUser,
    verifyOtp,
    refreshToken,
    logout,
    googleAuth,
    resentOtp,
    forgotPassword,
    login,
    resetPassword,
    currentUser,
  } = controllers(dependencies);

  const router = Router();

  router.post("/signup", validateSignUP, validateRequest, creatUser);
  router.post("/verifyOtp", verifyOtp);
  router.post("/refreshToken", refreshToken);
  router.post("/logout", logout);
  router.post("/googleSignup", googleAuth);
  router.post("/resentOtp", resentOtp);
  router.post("/forgotPassword", forgotPassword);
  router.post("/resetPassword", resetPassword);
  router.post("/currentUser", currentUser);
  router.post("/login", validateLogin, validateRequest, login);
  return router;
};
