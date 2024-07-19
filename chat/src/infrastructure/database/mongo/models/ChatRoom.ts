import { model, Schema } from "mongoose";

interface IChat {
  partcipants: [];
  lastMessage: any;
  roomCreater: string;
  unReadMessage: string;
}
const chatRoomSchema = new Schema(
  {
    roomCreater: {
      type: String,
    },
    roomName: {
      type: String,
    },
    roomProfile: {
      type: String,
    },
    partcipants: [],

    lastMessage: {
      type: Schema.Types.Mixed,
    },
    unReadMessage:{
      type:Array,
      default:[]
    },
    read: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export const ChatRoomSchema = model<IChat>("chat", chatRoomSchema);
