"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("name") as string;

    if (query) {
       router.push(`/list?query=${query}`);
    }
  };

  return (
    <>
      <form
        className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1 ml-5"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="name"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none"
        />
        <button className="cursor-pointer">
          <Image src="/search.png" alt="" width={16} height={61} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
