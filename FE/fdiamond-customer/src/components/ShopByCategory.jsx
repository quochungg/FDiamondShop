import { CategoryItem } from "src/components/index";

const ShopByCategory = () => {
    return (
        <>
            <div
                className="mt-16 mb-20"
            >
                <div>
                    <p className="font-lora text-3xl text-center capitalize">Shop By Category</p>
                </div>

                <div className="flex flex-row justify-center mx-auto mt-16">
                    <ul className="w-full grid grid-cols-4 list-none text-center">
                        <CategoryItem />

                    </ul>

                    <ul className="w-full grid grid-cols-4 list-none text-center">
                        <CategoryItem />

                    </ul>

                    <ul className="w-full grid grid-cols-4 list-none text-center">
                        <CategoryItem />

                    </ul>

                    <ul className="w-full grid grid-cols-4 list-none text-center">
                        <CategoryItem />

                    </ul>
                </div>


            </div>
        </>
    )
};

export default ShopByCategory;
