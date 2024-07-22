import { CartLinesList, SummarySection } from "../index";

const MainCartSection = ({ cartLineArr, checkoutErrors,
    onRemoveCartline, onUpdateRingSize, onReplaceCartline, onCheckout
}) => {

    return (
        <>
            <main className="h-auto w-full grid grid-cols-3 gap-x-10 py-10 px-10">


                <div className="h-full col-span-2">
                    <CartLinesList
                        cartLineArr={cartLineArr}
                        onRemoveCartline={onRemoveCartline}
                        onUpdateRingSize={onUpdateRingSize}
                        onReplaceCartline={onReplaceCartline}
                        checkoutErrors={checkoutErrors}
                    />
                </div>


                <div className="h-full col-span-1">
                    <SummarySection
                        key={cartLineArr}
                        cartLineArr={cartLineArr}
                        onCheckout={onCheckout}
                    />
                </div>

            </main>


        </>
    )
};

export default MainCartSection;
