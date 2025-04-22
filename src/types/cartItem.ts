import { Product } from "./order";

 export type CartItem = Product & {
  quantity: number; 
};
