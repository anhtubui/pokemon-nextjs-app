import { useState } from "react";

function usePagination<T>(data: Array<T>, itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const lastIndex = currentPage * itemsPerPage;
    const paginatedList = data.slice(lastIndex - itemsPerPage, lastIndex);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return { paginatedList, paginate, currentPage };
}

export default usePagination;
