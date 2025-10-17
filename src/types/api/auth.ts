export interface AuthMeInterface {
  message: string;
  data: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}
