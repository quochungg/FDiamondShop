import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPage, handlePageClick, currentPage }) => {
    // console.log('Pagination renders')
    const aTags = "px-5 py-2"
    const liTags = "flex items-center rounded-sm hover:bg-slate-200 transition hover:duration-150";

    const handlePageChange = (e) => {
        const newPage = e.selected + 1;

        handlePageClick({
            pageNumber: newPage
        })
    }

    return (
        <>
            <ReactPaginate
                className='font-gantari flex flex-row justify-center text-[18px] p-10'
                forcePage={currentPage - 1}
                onPageChange={handlePageChange}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                containerClassName="pagination"
                activeClassName="active !bg-blue-950 text-white "
                pageClassName={`page-item ${liTags}`}
                pageLinkClassName={`page-link ${aTags}`}
                breakLabel="..."
                breakClassName={`page-item ${liTags}`}
                breakLinkClassName={`page-link ${aTags}`}
                previousLabel="Prev"
                previousClassName={`page-item ${liTags}`}
                previousLinkClassName="page-link px-4 py-2"
                nextLabel="Next"
                nextClassName={`page-item ${liTags}`}
                nextLinkClassName="page-link px-4 py-2"
                renderOnZeroPageCount={null}
            />

        </>
    )
};

export default Pagination;
