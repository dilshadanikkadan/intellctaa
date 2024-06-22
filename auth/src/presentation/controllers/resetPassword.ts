import { IDependencies } from "@/application/interfaces/IDependencies";

export const resetPasswordController = (dependencies: IDependencies) => {
  const {
    useCases: { resetPasswordUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const response = await resetPasswordUseCase(dependencies).execute(
        req.body
      );

      res.status(200).json(response);
    } catch (error) {
      console.error(error);

      next(error);
    }
  };
};
