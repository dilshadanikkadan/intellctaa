import { ChatRoomSchema } from "../../models/ChatRoom";
import { createChat } from "./createChat";

export const joinToGroup = async (payload) => {
  const { courseId, instructor, userId, amount } = payload;
  if (amount < 799) {
    return;
  }
  try {
    console.log("&&&&&&&", payload);

    const room = await ChatRoomSchema.findOneAndUpdate(
      { roomCreater: courseId },
      {
        $push: { partcipants: userId },
      },
      {
        new: true,
      }
    );
    await createChat({
      instructor,
      userId,
    });
    return room;
  } catch (error) {
    console.log(error);
  }
};
