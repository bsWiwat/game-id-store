interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* ปุ่ม Previous */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-[#D99F2B] cursor-not-allowed text-white"
            : "bg-white hover:bg-gray-200 text-[#D99F2B] ring-1 ring-[#D99F2B]"
        }`}
      >
        Prev
      </button>

      {/* ปุ่มเลขหน้า */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg ${
              currentPage === page
                ? "bg-[#D99F2B] text-white"
                : "bg-white hover:bg-gray-200 text-[#D99F2B] ring-1 ring-[#D99F2B] "
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* ปุ่ม Next */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg  ${
          currentPage === totalPages
            ? "bg-[#D99F2B] cursor-not-allowed text-white"
            : "bg-white hover:bg-gray-200 text-[#D99F2B] ring-1 ring-[#D99F2B]"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
