export interface IMessage{
   roomId:string;
   senderId:string;
   deleteForMe:Boolean;
   read:Boolean;
   pinned:Boolean;
}