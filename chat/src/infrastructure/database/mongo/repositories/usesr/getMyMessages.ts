import { ChatRoomSchema } from "../../models/ChatRoom";

export const getMyMessages = async (id: any): Promise<any> => {

    
  return await ChatRoomSchema.find({ partcipants: { $in: [id] } });
};
 