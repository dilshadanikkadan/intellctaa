import { validateSignUP } from "@/_lib/utils/services/validation/signup.validation";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { validateRequest } from "@intellectaa/common";
import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const { creatUser, createRoom ,createChat,getMessages,getMyMessages} = controllers(dependencies);

  const router = Router();

  router.post("/signup", validateSignUP, validateRequest, creatUser);
  router.post("/createChatRoom", createRoom);
  router.post("/createMessage", createChat);
  router.get("/getMessages/:id", getMessages);
  router.get("/getMyMessages/:id", getMyMessages);

  return router;
};
