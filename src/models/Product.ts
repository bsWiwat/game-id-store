export interface Product {
  GameId: GameId;
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

export interface CartItem extends Product {
  quantity: number;
}

export interface GameId {
  usernameId: string;
  passwordId: string;
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

