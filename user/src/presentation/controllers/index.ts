import { IDependencies } from "@/application/interfaces/IDependencies";
import { createUserController } from "./createUser";
import { blockController } from "./blockUser";
import { getAllUserController } from "./getAllUsers";
import { instructorCreateController } from "./instructorCreate";

export const controllers = (dependencies: IDependencies) => {
    return {
        creatUser: createUserController(dependencies),
        blockUser:blockController(dependencies),
        getAllUsers:getAllUserController(dependencies),
        instructorCreate:instructorCreateController(dependencies)
    }
};