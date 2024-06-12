export type StatusType = 'IN_PROGRESS' | 'SUCCESS' | 'FAILED';

export type ActionAuthType = 'LOGIN' | 'LOGOUT' | 'SIGNUP';

export interface IUser {
  email: string | null,
  password?: string | null,
  _id?: string | null,
}
