import { ChatRoomSchema } from "../../models/ChatRoom";

export const createChat = async (payload: any): Promise<any> => {
  const { userId, instructor } = payload;
  const newRoom = new ChatRoomSchema({
    partcipants: [userId, instructor],
    roomCreater: instructor,
    lastMessage: "",
  });

  return await newRoom.save();
};
