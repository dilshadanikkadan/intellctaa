import { MessageModel } from "../../models/Message";

export const pinMessage = async (payload) => {
//   const { messageId } = payload;

  try {
    const message = await MessageModel.findByIdAndUpdate(
        payload,
      { $set: { pinned: true } },
      { new: true }
    );

    // console.log("message", message);

    return message;
  } catch (error) {}
};
