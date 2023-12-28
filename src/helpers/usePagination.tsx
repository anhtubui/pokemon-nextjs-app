import { useState } from "react";

const usePagination = (data: Array<any>, itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const lastIndex = currentPage * itemsPerPage;
    const paginatedList = data.slice(lastIndex - itemsPerPage, currentPage * itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return { paginatedList, paginate, currentPage };
};

export default usePagination;
