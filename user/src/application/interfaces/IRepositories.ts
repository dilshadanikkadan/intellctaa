export interface IRepositories {
  createUser: (data: any) => Promise<any>;
  blockUser: (data: any) => Promise<any>;
  getAllUser: (data: any) => Promise<any>;
  instructorCreate: (data: any) => Promise<any>;
  updateProfile: (data: any) => Promise<any>;
  getAllInstructor: (data: any) => Promise<any>;
  userStatics: (data: any) => Promise<any>;
  instructorStatics: (data: any) => Promise<any>;
}
