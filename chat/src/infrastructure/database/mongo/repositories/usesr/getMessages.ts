import { MessageModel } from "../../models/Message";

export const getMessages = async (roomId: any): Promise<any> => {
  const response = await MessageModel.find({ roomId });

  return response;
};
