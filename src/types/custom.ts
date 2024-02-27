export type User = {
  userId: number,
  email: string,
  name: string,
  password?: string,
  roles: number[],
  createdAt?: NativeDate,
  updatedAt?: NativeDate,
  token?: string | null
};