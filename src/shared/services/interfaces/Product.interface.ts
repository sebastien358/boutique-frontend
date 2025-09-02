import type { CategoryInterface } from "./Category.interface";

export interface ProductBaseInterface {
  title: string;
  image?: string;
  price: number;
  description: string;
  category: CategoryInterface;
}

export interface ProductInterface extends ProductBaseInterface {
  id: number;
}

export interface ProductFormInterface extends ProductBaseInterface {
  id?: number;
}
