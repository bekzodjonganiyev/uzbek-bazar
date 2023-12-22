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

export type productListType = {
  id: number;
  name?: string;
  price?: number;
  discount: number;
  new_price?: any;
  gender?: string;
  type?: string;
  season?: string;
  material?: number;
  size?: number[];
  brand?: number;
  category?: number;
  is_favorite?: boolean;
  is_cart?: boolean;
  photo: string;
  rating?: any;
  row?: boolean,
  minimum_order_count?: number
};
