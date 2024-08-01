
import * as repositories from "@/infrastructure/database/mongo/repositories/usesr";
import * as useCases from "@/application/useCases";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const dependencies: IDependencies = {
    repositories,
    useCases
};  