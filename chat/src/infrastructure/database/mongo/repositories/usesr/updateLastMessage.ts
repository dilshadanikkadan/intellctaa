import { ChatRoomSchema } from "../../models/ChatRoom";

export const updateLastMessage = async ({ roomId, message }): Promise<any> => {
  try {

    
    const msg = await ChatRoomSchema.findByIdAndUpdate(roomId, {
      $set: { lastMessage: message },$push:{unReadMessage:'.'},
    },{new:true});
    return msg;
  } catch (error) {}
};
