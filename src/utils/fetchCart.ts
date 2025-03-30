import { Product } from '@/models/Product';
export const fetchCart = async (userId: string) => {
  try {
    const response = await fetch(`/api/cart/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    const cartItems = await response.json(); // Directly receive an array

    return cartItems.map((Product: Product) => ({
      id: Product.id,
      categoryName: Product.categoryName,
      shortDescription: Product.shortDescription,
      description: Product.description,
      productName: Product.productName,
      price: Product.price,
      coverImageUrl: Product.coverImageUrl || Product.imageUrls[0] || "/logo.png",
      imageUrls: Product.imageUrls || [],
      createdAt: new Date(Product.createdAt),
      isActive: Product.isActive,
    }));
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
