import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    courseId: {
      type: Schema.Types.ObjectId,
    },
    courseMode: {
      type: String,
      enum: ["premium", "basic"],
    },
    method: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model("payments", PaymentSchema);
