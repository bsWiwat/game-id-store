"use client";
import { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { Product } from "@/models/Product";

const HomePage = () => {
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
      <div className="">
        {/* Baner Silder*/}
        <Slider />

        {/*Categorylist*/}
        <div className="mt-10">
          <CategoryList />
        </div>

        {/*Recoment Product Card list*/}
        <div className="mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 ">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl mb-6 font-bold">Recommend</h1>
            <button className="text-sm md:text-lg text-white bg-[#D99F2B] px-10 h-9">
              See all
            </button>
          </div>

          <div className="flex flex-wrap gap-10 justify-center mx-5 ">
            {/* map ข้อมูลแต่ละ product และส่งไปยัง Card component */}
            {products.slice(0, 4).map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32">
          <h1 className="text-2xl font-bold mb-6">New Products</h1>
          <div className="flex flex-wrap gap-10 justify-center mx-5">
            {/* map ข้อมูลแต่ละ product และส่งไปยัง Card component */}
            {products.slice(0, 9).map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
