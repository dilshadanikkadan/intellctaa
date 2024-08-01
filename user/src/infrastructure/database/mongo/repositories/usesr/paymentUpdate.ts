import { User } from "../../models/User";

export const pyamentUpdate = async (payload) => {
  const { instructor, amount }: any = payload;
  try {
    const adminFund = (amount * 20) / 100;
    const instructorFund = (amount * 80) / 100;
    await User.findOneAndUpdate(
      { isAdmin: true },
      {
        $inc: { profit: Math.ceil(adminFund) },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      instructor,
      {
        $inc: { profit: Math.ceil(instructorFund) },
      },
      { new: true }
    );
  } catch (error) {}
};
