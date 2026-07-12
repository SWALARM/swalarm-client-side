export interface IUser {
  id: string;
  email: string;
  userName: string;
  role: Role;
  isBlocked?: boolean;
}

export type Role = 'admin' | 'user';
