import { IDependencies } from "@/application/interfaces/IDependencies";
import { createUserController } from "./createUser";
import { blockController } from "./blockUser";
import { getAllUserController } from "./getAllUsers";
import { instructorCreateController } from "./instructorCreate";
import { updateProfileController } from "./updateProfile";
import { getAllInstructorController } from "./getAllInstructor";
import { userStaticsController } from "./getUserStatics";
import { instructorStaticsController } from "./getInstructorStatics";

export const controllers = (dependencies: IDependencies) => {
  return {
    creatUser: createUserController(dependencies),
    blockUser: blockController(dependencies),
    getAllUsers: getAllUserController(dependencies),
    instructorCreate: instructorCreateController(dependencies),
    updateProfile: updateProfileController(dependencies),
    getAllInstructor: getAllInstructorController(dependencies),
    userStatics: userStaticsController(dependencies),
    instructorStatics: instructorStaticsController(dependencies),
  };
};
