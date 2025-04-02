import Image from "next/image";
import Link from "next/link";
import { CardProps } from "@/models/Product";

const ProductList: React.FC<CardProps> = ({ product }) => {
  // Ensure that product.imageUrls is defined and has at least one image
  const imageUrl =
    product.coverImageUrl &&
    product.coverImageUrl.length > 0 &&
    product.isActive
      ? product.coverImageUrl
      : product.imageUrls.length > 0
      ? product.coverImageUrl
      : "/logo.png";

  return (
    <Link href={`/${product.id}`} className="block">
      <div className="w-[263px] h-[325px] bg-white shadow-lg flex flex-col justify-start rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f5f5f5]">
        {/* Image */}
        <div className="relative w-[263px] h-[237px]">
          <Image
            src={imageUrl}
            alt={product.productName}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-cover object-top"
            priority // Optional: Use priority loading for the main image
          />
        </div>

        {/* Product Information */}
        <div className="p-2 w-full">
          <p className="text-black font-bold text-lg">{product.categoryName}</p>
          {/* Game Name & Price */}
          <div className="flex justify-between items-center">
            <p className="text-[#D99F2b] text-sm mt-1">{product.productName}</p>
            <p className="text-[#D99F2b] text-lg">฿ {product.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;

