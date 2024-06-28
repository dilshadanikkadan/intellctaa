export interface IRepositories {
  createUser: (data: any) => Promise<any>;
  verifyOtp: (data: any) => Promise<any>;
  refreshToken: (data: any) => Promise<any>;
  logout: (data: any) => Promise<any>;
  resentOtp: (data: any) => Promise<any>;
  forgotPassword:(data: any) => Promise<any>;
  resetPassword:(data: any) => Promise<any>;
  login:(data: any) => Promise<any>;
}
