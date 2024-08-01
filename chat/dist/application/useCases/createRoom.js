"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomUseCase = void 0;
const createRoomUseCase = (dependencies) => {
    const { repositories: { createRoom }, } = dependencies;
    return {
        execute: async (data) => {
            return await createRoom(data);
        },
    };
};
exports.createRoomUseCase = createRoomUseCase;
