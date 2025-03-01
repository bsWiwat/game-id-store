"use client";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { Product } from "@/models/Product";

const ListPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // กำหนดชนิดของ products เป็น array ของ Product

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/data/products.json");
      const data: Product[] = await res.json(); // กำหนดให้ data เป็นประเภท Product[]
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Slider />
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* Filter */}
        <Filter />
        {/* Products */}
        <h1 className="mt-12 text-xl font-semibold">For you!</h1>
        {products.slice(0, 4).map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ListPage;
