import { Product } from "./order";

export type ProductType = {
  name: string;
  brand: string;
  category: string;
  price: string;
  stock: string;
  images: string[];
  star: string;
  description: string;
  details: string[];
};

export type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product ;
};
