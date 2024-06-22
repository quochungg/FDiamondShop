//check thua thieu s

const CategoryHero = ({ categoryInfo }) => {
    // console.log('CategoryInfo renders')

    return (
        <>
            <div className="flex flex-row items-start h-[400px] bg-[#f6f6f6] pl-24 py-2 ">

                <div className="flex flex-1 flex-col items-start content-start mt-[50px] mr-6">
                    <p className="font-lora uppercase text-[16px] font-[900] tracking-[0.5px] leading-[24px] mb-1">
                        Today we have {categoryInfo.productCount}
                    </p>
                    <h1 className="font-lora capitalize text-[30px] tracking-[1px]  ">
                        {categoryInfo.categoryName === "Diamond"
                            ? "Natural Diamonds"
                            : `${categoryInfo.categoryName}s`}
                    </h1>
                    <p className="font-gantari text-[16px]  mt-4">
                        {categoryInfo.description}
                    </p>
                </div>

                <div className="flex flex-1 items-center justify-center h-full">
                    <picture className="w-[350px] h-auto">
                        <img className="align-middle w-full" src={categoryInfo.imageUrl} />
                    </picture>
                </div>

            </div>
        </>
    );
};


export default CategoryHero;
