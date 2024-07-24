import { User } from "../../models/User";

export const instructorStatics = async (payload) => {
  const date = new Date();
  const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const previousMonth = new Date(lastMonth);
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  const data = await User.aggregate([
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: previousMonth,
            },
          },
          {
            isInstructor: true,
          },
        ],
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        count: 1,
      },
    },
  ]);
  return data;
};