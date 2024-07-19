import { ChatRoomSchema } from "../../models/ChatRoom";

export const updateUnReadMessage = async (roomId): Promise<any> => {
  console.log("_______________________________");
  console.log(roomId);
  console.log("_______________________________");

  try {
    const msg = await ChatRoomSchema.findByIdAndUpdate(
      roomId,
      {
        $set: { unReadMessage: [] }
      },
      { new: true }
    );
    return msg;
  } catch (error) {}
};
