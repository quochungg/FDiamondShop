

const EmptyRecommendedProducts = () => {
    return (
        <>
            <div className="w-full mx-2 h-80 border-[1px] border-gray-400 rounded-sm border-dashed
            flex flex-col justify-center items-center"
            >
                <p className="text-[#B8B8B8] text-2xl font-[550] tracking-wide font-lora mt-4">
                    No Similar Products
                </p>

                <p className="text-[#B8B8B8] text-lg font-[400] tracking-wide font-gantari mt-7">
                    Looks like there are no similar products available.
                </p>
            </div>

        </>
    )
};

export default EmptyRecommendedProducts;
