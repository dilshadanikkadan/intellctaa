import { ChatRoomSchema } from "../../models/ChatRoom";

export const createRoom = async (payload: any): Promise<any> => {
  const { partcipants ,roomCreater} = payload;
  const newRoom = new ChatRoomSchema({
    partcipants: [...partcipants],
    roomCreater
  });

  return await newRoom.save()
};
