import Image from "next/image";
import Link from "next/link";
import { CardProps } from "@/models/Product";

const ProductList: React.FC<CardProps> = ({ product }) => {
  return (
    <Link href={`/${product.id}`} className="block">
      <div className="w-[263px] h-[325px] bg-white shadow-lg flex flex-col justify-start rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f5f5f5]">
        {/* รูปภาพ */}
        <Image
          src={product.image}
          alt={product.name}
          width={263}
          height={237}
          className="w-[263px] h-[237px] object-cover object-top"
        />

        {/* ข้อมูลเกม */}
        <div className="p-2 w-full">
          <p className="text-black font-bold text-lg">{product.name}</p>
          {/* ชื่อเกม & ราคา */}
          <div className="flex justify-between items-center">
            <p className="text-[#D99F2b] text-sm mt-1">Game-{product.id}</p>

            <p className="text-[#D99F2b] text-lg">
              {product.currency} {product.price}
            </p>
          </div>

          {/* Game ID */}
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
