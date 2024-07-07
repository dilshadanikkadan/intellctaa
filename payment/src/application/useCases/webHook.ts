import { IDependencies } from "../interfaces/IDependencies";

export const webHookUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { webHook },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await webHook(data);
    },
  };
};
