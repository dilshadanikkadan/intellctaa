
import { validateSignUP } from "@/_lib/utils/services/validation/signup.validation";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { validateRequest } from "@intellectaa/common";
import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const {
    creatUser,
    blockUser,
    getAllUsers,
    instructorCreate

  } = controllers(dependencies);

  const router = Router();

  router.post("/signup", validateSignUP, validateRequest, creatUser);
  router.put("/blockUser", blockUser);
  router.get("/getAllUsers", getAllUsers);
  router.put("/createInstructor", instructorCreate);

  return router;
};
