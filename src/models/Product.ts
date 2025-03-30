export interface Product {
  id: string;
  productName: string;
  imageUrls: string[];
  coverImageUrl: string;
  price: number;
  categoryName: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  categoryName: string;
}

export interface ProductRequest {
  productName: string;
  price: number;
  coverImageUrl: string;
  imageUrls: string[];
  categoryName: string;
  shortDescription: string;
  description: string;
}

export interface CardProps {
  product: Product;
}

export interface ProductImagesProps {
  gallery: string[];
}

export interface FilterProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

