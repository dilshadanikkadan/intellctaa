import { User } from "../../models/User";

export const getAllUser = async (payload: any) => {
  const { _limit, _page } = payload;
  console.log("____________________________________-",payload);
  
  const limit = parseInt(_limit, 10) || 5;
  const pageNumber = parseInt(_page, 10) || 1; 
  const skip = (pageNumber - 1) * limit;

  try {
    const allUsers = await User.find({ isAdmin: { $ne: true } })
      .skip(skip)
      .limit(limit);
    
    const totalCount = await User.countDocuments({ isAdmin: { $ne: true } });

    return {
      users: allUsers,
      totalCount: totalCount
    };
  } catch (error) {
     
  }
};
