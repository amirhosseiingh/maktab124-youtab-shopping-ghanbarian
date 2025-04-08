export interface Product {
  name: string;
  quantity: number;
  price: number;
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