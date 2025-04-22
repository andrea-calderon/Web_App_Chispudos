export type UserResponseType = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  roles: Array<{
    id: number;
    name: 'Admin' | 'User' | 'Merchant'; // Ajusta los nombres según el backend
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;
  }>;
  averageRating: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  avatarUrl: string;
};

export type LoginResponse = {
  user: UserResponseType;
  token: string;
};

export type SuccessResponseType<T> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorResponseType = {
  success: false;
  message: string;
  error: string;
};

export type ApiResponseType<T> = SuccessResponseType<T> | ErrorResponseType;

// Example usage with UserResponseType
export type UserApiResponseType = ApiResponseType<{
  user: UserResponseType;
  token: string;
}>;
