import { useState } from "react";
import { Product } from "@/models/Product";
import { FilterProps } from "@/models/Product";

const Filter = ({ products, setFilteredProducts }: FilterProps) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    sort: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.minPrice) {
      filtered = filtered.filter(
        (p) => p.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (p) => p.price <= parseFloat(filters.maxPrice)
      );
    }
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
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
          type="text"
          name="minPrice"
          placeholder="min price"
          onChange={handleChange}
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <input
          type="text"
          name="maxPrice"
          placeholder="max price"
          onChange={handleChange}
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <select
          name="category"
          onChange={handleChange}
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-100"
        >
          <option value="">Category</option>
          <option value="Arena of Valor">Arena of Valor</option>
          <option value="Cookie Run Kingdoms">Cookie Run Kingdoms</option>
          <option value="Elden Ring">Elden Ring</option>
          <option value="Genshin Impact">Genshin Impact</option>
          <option value="Honkai Star Rail">Honkai Star Rail</option>
          <option value="Legue of Legend">Legue of Legend</option>
          <option value="Marvel Rivals">Marvel Rivals</option>
          <option value="Pokemon TCG">Pokemon TCG</option>
          <option value="Valorant">Valorant</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-6">
        <div>
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
        </div>
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
