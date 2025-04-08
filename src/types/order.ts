export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  images: string[];
  description: string;
  details: string[];
}

export interface Order {
  id: string;
  createdAt: string;
  username: string;
  totalAmount: number;
  status: string;
  address: string;
  products: Product[];
}

export type Props = {
  order: Order;
  onClose: () => void;
  onSuccess: () => void;
};
