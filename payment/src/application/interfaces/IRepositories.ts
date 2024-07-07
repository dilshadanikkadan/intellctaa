export interface IRepositories {
  createUser: (data: any) => Promise<any>;
  stripeSession:(data: any) => Promise<any>;
  webHook:(data: any) => Promise<any>;
}
