export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  images: string[];
  description: string;
  details: string[];
  brand: string;
  star: string;
  rating: number;
  quantity: number;
}

export interface ProductRecord {
  [key: string]: Product;
}

export interface ProductsTableProps {
  products: Product[];
  toggleMenu: (id: number) => void;
  showMenu: number | null;
  handleView: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}


export interface Order {
  shippingCost: number;
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

export interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}