import { validateSignUP } from "@/_lib/utils/services/validation/signup.validation";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import {
  requireAdmin,
  requireUser,
  validateRequest,
} from "@intellectaa/common";
import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const {
    creatUser,
    blockUser,
    getAllUsers,
    instructorCreate,
    updateProfile,
    getAllInstructor,
  } = controllers(dependencies);

  const router = Router();

  router.post("/signup", validateSignUP, validateRequest, creatUser);
  router.put("/ ", blockUser);
  router.get("/getAllUsers",requireAdmin, getAllUsers);
  router.get("/getAllInstructor", requireAdmin, getAllInstructor);
  router.put("/createInstructor", requireUser, instructorCreate);
  router.put("/updateProfile", requireUser, updateProfile);

  return router; 
};
