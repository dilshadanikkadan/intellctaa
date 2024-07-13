import { IDependencies } from "../interfaces/IDependencies";

export const stripeSessionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { stripeSession },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await stripeSession(data);
    },
  };
};
