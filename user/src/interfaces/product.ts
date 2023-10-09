export type productMedia = {
  id: number;
  file: string;
};

export type productColor = {
  id: number;
  color: string;
  quantity: number;
  is_active: boolean;
  media: productMedia[];
};
