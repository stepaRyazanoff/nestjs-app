export interface AuthenticatedRequest extends Request {
  user: {
    firstName: string;
    userName: string;
    email: string;
  };
}
