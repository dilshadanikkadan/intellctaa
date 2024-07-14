import { IDependencies } from "@/application/interfaces/IDependencies";
import { createUserController } from "./createUser";
import { createRoomController } from "./CreatRoom";
import { createChatController } from "./CreateMessage";
import { getMessagesController } from "./getMessages";
import { getMYMessagesController } from "./getMyMessages";



export const controllers = (dependencies: IDependencies) => {
    return {
        creatUser: createUserController(dependencies),
        createRoom:createRoomController(dependencies),
        createChat:createChatController(dependencies),
        getMessages:getMessagesController(dependencies),
        getMyMessages:getMYMessagesController(dependencies),
 
    }
};