import { IDependencies } from "@/application/interfaces/IDependencies";

export const updateProfileController = (dependencies: IDependencies) => {
  const {
    useCases: { updateProfileUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await updateProfileUseCase(dependencies).execute(
        req.body
      );
   

      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  };
};
