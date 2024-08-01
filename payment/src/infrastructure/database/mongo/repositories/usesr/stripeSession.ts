import { Session } from "../../models/Session";

export const stripeSession = async (payload: any) => {
  const { userId }: any = payload;

  const existUser = await Session.findOne({userId});
  if (existUser) {
    await Session.findOneAndDelete({userId});
  }
  const newSession = new Session({
    ...payload,
  });
  return await newSession.save();
};
