import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "src/layout/AppLayout";
import { EmptyDiscountList, VoucherItem } from "src/features/Order/components/index";
import { getNonExpiredDiscountCodes } from "src/features/Order/api/APIs"
import { LoadingSpinner } from "src/components";

const DiscountListPage = () => {
    const navigate = useNavigate();

    const [validDiscountArr, setValidDiscountArr] = useState(null);

    useEffect(() => {
        const fetchDiscountCodes = async () => {
            const response = await getNonExpiredDiscountCodes();
            const discountArr = response.data.result;
            if (discountArr) {
                setValidDiscountArr(discountArr);
            }
        }
        fetchDiscountCodes();
    }, [])



    if (validDiscountArr && validDiscountArr.length === 0) {
        return (
            <AppLayout>
                <div>
                    <EmptyDiscountList />
                </div>
            </AppLayout>
        )
    }


    if (validDiscountArr && validDiscountArr.length > 0) {
        // sort by discount percent in desc order
        validDiscountArr.sort((a, b) => {
            if (a.discountPercent > b.discountPercent) {
                return -1;
            }
            else if (a.discountPercent < b.discountPercent) {
                return 1;
            }
            else return 0;
        })
    }

    if (!validDiscountArr) {
        return (
            <LoadingSpinner />
        )
    }


    return (
        <>
            <AppLayout>
                {validDiscountArr &&
                    <div className="py-20 bg-gray-100 grid grid-cols-[1fr_30%] px-20 gap-x-10">

                        <div>

                            <ul className="w-full flex flex-col space-y-10">
                                {validDiscountArr.map((voucherItem, index) => (
                                    <li key={index}>
                                        <VoucherItem voucherItem={voucherItem} />
                                    </li>

                                ))}
                            </ul>

                        </div>

                        <div className="h-full">
                            <div className="border-[1px] h-[16.5rem] sticky top-10 rounded-md text-center font-gantari bg-[#000035] text-yellow-500">
                                <p className="text-3xl font-[700] mt-10 font-poppins">Limited-Time Offers</p>
                                <p className="text-lg font-[400] mt-6">Don't miss out on our exclusive discounts!</p>
                                <button
                                    onClick={() => { navigate("/product") }}
                                    className="mt-8"
                                >
                                    <p className="uppercase px-16 py-4 font-[700] rounded-md bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200
                                     text-black tracking-wide"
                                    >
                                        Shop Now
                                    </p>
                                </button>
                            </div>
                        </div>

                    </div>
                }

            </AppLayout>
        </>
    )
};

export default DiscountListPage;
