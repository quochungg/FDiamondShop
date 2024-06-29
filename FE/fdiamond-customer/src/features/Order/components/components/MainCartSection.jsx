import { CartLinesList, SummarySection } from "../index";

const MainCartSection = () => {
    return (
        <>
            <main className="h-auto w-full grid grid-cols-3 gap-x-10 py-10 px-16 mb-20">


                <div className="bg-[#fbfbfb] h-full col-span-2">
                    <CartLinesList />
                </div>

                <div className="bg-[#fbfbfb] h-full col-span-1">
                    <SummarySection />
                </div>

            </main>

        </>
    )
};

export default MainCartSection;
