import { MessageModel } from "../../models/Message";

export const createMessage = async (payload: any): Promise<any> => {
   
  const newMessage = new MessageModel({
    ...payload
  });

  return await newMessage.save()
};
