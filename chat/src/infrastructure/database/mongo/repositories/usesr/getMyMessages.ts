import { ChatRoomSchema } from "../../models/ChatRoom";

export const getMyMessages = async (id: any): Promise<any> => {
  const stringId = String(id);

  console.log("Participant ID:", stringId);

  const pipeline = [
    {
      $match: { partcipants: stringId },
    },
    {
      $lookup: {
        from: "users",
        let: { participants: "$partcipants" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [{ $toString: "$_id" }, "$$participants"],
              },
            },
          },
        ],
        as: "participantDetails",
      },
    },
    {
      $project: {
        _id: 1,
        roomCreater: 1,
        partcipants: 1,
        createdAt: 1,
        updatedAt: 1,
        lastMessage: 1,
        roomName: 1,
        roomProfile: 1,
        participantDetails: {
          _id: 1,
          username: 1,
        },
      },
    },
  ];

  const result = await ChatRoomSchema.aggregate(pipeline);

  return result;
};
