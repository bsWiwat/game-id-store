export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  description: string;
  gallery: string[];
}

export interface CardProps {
  product: Product;
}

export interface ProductImagesProps {
  gallery: string[];
}
