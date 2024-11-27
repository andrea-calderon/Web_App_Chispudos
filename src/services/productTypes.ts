export interface CategoryType {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
  type: number;
  price: number;
  specialPrice: number;
  location: string;
  latitude: number;
  longitude: number;
  categories: CategoryType[];
}
