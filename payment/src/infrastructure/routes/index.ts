import { validateSignUP } from "@/_lib/utils/services/validation/signup.validation";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { validateRequest } from "@intellectaa/common";
import { Router } from "express";
import express from "express";

export const routes = (dependencies: IDependencies) => {
  const { creatUser, createSession, webHook } = controllers(dependencies);

  const router = Router();

  router.post("/signup", validateSignUP, validateRequest, creatUser);
  router.post("/stripeSession", createSession);
  router.post("/webhook", express.raw({ type: "application/json" }), webHook);
  return router;
};
