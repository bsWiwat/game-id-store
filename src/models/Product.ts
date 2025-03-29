// export interface Product {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   currency: string;
//   category: string;
//   description: string;
//   gallery: string[];
// }

export interface Product {
  id: string;
  productName: string;
  imageUrls: string[];
  price: number;
  categoryName: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
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




