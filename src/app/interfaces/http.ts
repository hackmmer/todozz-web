import { IWorkspace } from "./todo";
import { IUser } from "./user";

export interface IShareResp {
  token: string,
  user: IUser,
  workspace: IWorkspace,
};

export interface IErrorResponse {
  error: string;
}
