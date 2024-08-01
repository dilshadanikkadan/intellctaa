export interface IRepositories {
  createUser: (data: any) => Promise<any>;
  createRoom: (data: any) => Promise<any>;
  createMessage: (data: any) => Promise<any>;
  getMessages: (data: any) => Promise<any>;
  getMyMessages: (data: any) => Promise<any>;
  
}
