import { User } from "./user";

export type question = {
  id: number;
  updated_at: string;
  created_at: string;
  question: string;
  answer: string;
  product: number;
  client: User;
};
