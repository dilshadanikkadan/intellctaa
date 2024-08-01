import { instructorCreate } from "@/infrastructure/database/mongo/repositories/usesr/InstuctorCreate";

export const userInstructorConsumer = async (payload) => {
  try {
    await instructorCreate(payload);
  } catch (error) {
    console.log(error);
  }
};
