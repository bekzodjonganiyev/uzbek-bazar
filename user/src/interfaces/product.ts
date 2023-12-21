export type productSize = {
  id: number;
  name: string;
};


export type productMedia = {
  id: number;
  file: string;
};

export type productVariable = {
  id: number;
  color: string;
  quantity: number;
  is_active: boolean;
  media: productMedia[];
};
