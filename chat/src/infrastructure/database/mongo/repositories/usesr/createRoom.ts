import { ChatRoomSchema } from "../../models/ChatRoom";

export const createRoom = async (payload: any): Promise<any> => {
  const { partcipants ,roomCreater,...rest} = payload;
  const newRoom = new ChatRoomSchema({
    partcipants: [...partcipants],
    roomCreater,
    ...rest
  });

  return await newRoom.save()
};
