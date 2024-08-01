import { IDependencies } from "../interfaces/IDependencies";

export const createRoomUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createRoom },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await createRoom(data);
    },
  };
};
