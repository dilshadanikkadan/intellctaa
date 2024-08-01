"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyMessages = void 0;
const ChatRoom_1 = require("../../models/ChatRoom");
const getMyMessages = async (id) => {
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
                unReadMessage: 1,
                roomProfile: 1,
                participantDetails: {
                    _id: 1,
                    username: 1,
                    profile: 1,
                },
            },
        },
    ];
    const result = await ChatRoom_1.ChatRoomSchema.aggregate(pipeline);
    return result;
};
exports.getMyMessages = getMyMessages;
