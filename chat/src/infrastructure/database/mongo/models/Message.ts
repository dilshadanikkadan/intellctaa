import { IMessage } from "@/domain/entities/Message";
import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    deleteForMe: {
      type: Boolean,
      default: false,
    },
    message: {
      type: Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
    },
    replyTo: {
      type: String,
    },
    replyMessage: {
      type: String,
    },
    typeMessage: {
      type: String,
      enum: ["text", "image", "audio", "video", "file","reply"],
      default: "text",
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

export const MessageModel = model<IMessage>("messages", messageSchema);
