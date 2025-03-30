import { useEffect, useState } from "react";
import { Product } from "@/models/Product";
import { FilterProps } from "@/models/Product";

const Filter = ({ products, setFilteredProducts }: FilterProps) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    categoryName: "",
    sort: "",
  });

  const [categories, setCategories] = useState<
    { id: string; categoryName: string }[]
  >([]);

  // ดึงหมวดหมู่จาก API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const filterProducts = () => {
    let filtered = [...products];

    const minPrice = parseFloat(filters.minPrice) || 0;
    const maxPrice = parseFloat(filters.maxPrice) || Number.MAX_VALUE;

    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (filters.categoryName) {
      filtered = filtered.filter(
        (p) => p.categoryName === filters.categoryName
      );
    }

    if (filters.sort) {
      const [order, key] = filters.sort.split(" ");
      const sortKey = key as keyof Product;

      if (typeof products[0]?.[sortKey] === "number") {
        filtered = filtered.sort((a, b) => {
          return order === "asc"
            ? (a[sortKey] as number) - (b[sortKey] as number)
            : (b[sortKey] as number) - (a[sortKey] as number);
        });
      }
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          onChange={handleChange}
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          onChange={handleChange}
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <select
          name="categoryName"
          onChange={handleChange}
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-100"
        >
          <option value="">Category</option>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
      </div>
      <div className="flex flex-wrap gap-6">
        <select
          name="sort"
          onChange={handleChange}
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
        <button
          onClick={filterProducts}
          className="bg-[#D99F2B] text-white py-2 px-4 rounded-2xl text-xs"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
