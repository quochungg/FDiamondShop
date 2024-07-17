import AppLayout from "src/layout/AppLayout";
import { EmptyDiscountList } from "src/features/Order/components/index";
import { getNonExpiredDiscountCodes } from "src/features/Order/api/APIs"
import { useState, useEffect } from "react";


const DiscountListPage = () => {
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


    return (
        <>
            <AppLayout>
                {validDiscountArr &&
                    <div>
                        <p>Today Deal</p>
                    </div>
                }

            </AppLayout>
        </>
    )
};

export default DiscountListPage;
