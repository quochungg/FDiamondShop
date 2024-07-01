import { CartLinesList, SummarySection } from "../index";

const MainCartSection = ({ cartLineArr }) => {

    return (
        <>
            <main className="h-auto w-full grid grid-cols-3 gap-x-10 py-10 px-10 mb-20">

                <div className="bg-[#fbfbfb] h-full col-span-2">
                    <CartLinesList
                        cartLineArr={cartLineArr}
                    />
                </div>

                <div className="bg-[#fbfbfb] h-full col-span-1">
                    <SummarySection />
                </div>

            </main>


        </>
    )
};

export default MainCartSection;
