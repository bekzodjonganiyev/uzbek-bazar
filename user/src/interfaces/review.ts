import { User } from "./user";

export type review = {
  id: number;
  updated_at: Date;
  created_at: Date;
  rating: number;
  comment: string;
  product: number;
  client: User;
};
