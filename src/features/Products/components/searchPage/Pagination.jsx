import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPage, handlePageClick, currentPage }) => {



    const handlePageChange = (e) => {
        const newPage = e.selected + 1;
        console.log('currentPage: ', e.selected + 1)
        handlePageClick({
            name: 'pageNumber',
            value: newPage
        })
    }

    //abc

    return (
        <>
            <ReactPaginate
                className='font-gantari flex flex-row gap-10 justify-end text-[17px] p-4'
                forcePage={currentPage - 1}
                onPageChange={handlePageChange}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="Prev"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active bg-pink"
                renderOnZeroPageCount={null}
            />
        </>
    )
};

export default Pagination;
