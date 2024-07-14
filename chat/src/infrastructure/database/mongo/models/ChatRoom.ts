import mongoose, { model, Schema } from "mongoose";

interface IChat {
  partcipants: [];
  lastMessage: any;
  roomCreater:string
}
const chatRoomSchema = new Schema(
  {
    roomCreater:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    partcipants: [],

    lastMessage: {
      type: Schema.Types.Mixed,
    },
  },

  {
    timestamps: true,
  }
);

export const ChatRoomSchema = model<IChat>("chat", chatRoomSchema);
