import { Link } from "react-router-dom";
import { CiDiscount1 } from "react-icons/ci";


const EmptyDiscountList = () => {
    return (
        <>
            <div className="h-auto flex flex-col justify-center items-center pt-32 pb-64">
                <div>
                    <CiDiscount1 size={120} />
                </div>


                <div className="font-gantari flex flex-col space-y-6 text-center mt-5">
                    <h2 className="text-2xl font-[650] tracking-wide font-lora capitalize"
                    >
                        No promo codes available
                    </h2>
                    <p className="text-lg font-[350]"
                    >
                        We're sorry, but we don't have any promo codes available at the moment.
                    </p>
                </div>

                <div className='mt-12'>
                    <Link
                        to="/product"
                        className="text-white text-lg uppercase font-gantari font-[450] bg-blue-950 hover:bg-[#34427b] px-14 py-5 rounded-sm"
                    >
                        Shop Without Promo Code
                    </Link>
                </div>
            </div>
        </>
    )
};

export default EmptyDiscountList;
