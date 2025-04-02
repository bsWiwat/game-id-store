"use client";
import { Suspense, useEffect, useState } from "react";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import Pagination from "@/components/Pagination";
import { Product } from "@/models/Product";
import { useSearchParams } from "next/navigation";

const itemPerPage = 8;

const ListPage = () => {
  return (
    <Suspense
      fallback={<p className="text-gray-500 text-center">Loading page...</p>}
    >
      <PageContent />
    </Suspense>
  );
};

const PageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = products.filter(
        (p) =>
          p.productName.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemPerPage);
  const displayProducts = filteredProducts.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <>
      <Slider />
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 relative">
        <Suspense
          fallback={
            <p className="text-gray-500 text-center">Loading filters...</p>
          }
        >
          <Filter
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </Suspense>
        <h1 className="mt-12 text-xl font-semibold mb-4">All Product List!</h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : displayProducts.length > 0 ? (
          <div className="flex flex-wrap gap-10 justify-center mx-5">
            {displayProducts.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No products found.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ListPage;
