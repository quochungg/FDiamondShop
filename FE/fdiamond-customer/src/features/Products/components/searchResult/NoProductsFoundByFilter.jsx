import filterNotFoundSvg from 'src/features/Products/assets/filterNotFoundSvg.svg';

const NoProductsFoundByFilter = ({ handleResetFilter }) => {
    return (
        <>
            <div className='my-28'>

                <div className='w-[60%] mx-auto text-center flex flex-col justify-center items-center font-gantari'>
                    <div className='w-32 mb-5'>
                        <img
                            src={filterNotFoundSvg}
                            alt="diamond selection"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className='font-[600] text-lg mb-4'>Sorry, we couldn't find any results that match your search criteria. Please try broadening your search or resetting your filters</p>

                    <p className='text-gray-500 font-[500] text-lg mb-7'>
                        To further refine your results, use the filters located at the top.
                    </p>

                    <div>
                        <button
                            className='border bg-[#000035] hover:bg-[#26265c] text-white font-[600] rounded-full border-[#000035] px-10 py-4'
                            onClick={() => handleResetFilter()}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
};

export default NoProductsFoundByFilter;
