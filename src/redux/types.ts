export interface Product {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  price: number;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
}

export type Details = {
  _id: string;
  name: string;
  price: number;
  avatar: string;
  desc: string;
};

export interface ProductState {
  products: undefined | null | Product[];
  categories: null | undefined | Category[];
  loading: boolean;
  error: string | null;
  detailError: string | null;
  details: any;
  filteredProducts: undefined | null | Product[];
  selectedFilter: string;
  selectedCategory: string;
}
