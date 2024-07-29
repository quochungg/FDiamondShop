import AppLayout from "src/layout/AppLayout";
import { Hero, ShopDiamondByShape, ShopByCategory, HandCraftedSection, StoreLocation } from "src/components";


const Home = () => {

    return (
        <>
            <AppLayout>

                <Hero />

                <ShopDiamondByShape />

                <ShopByCategory />

                <HandCraftedSection />

                <StoreLocation />

            </AppLayout>


        </>
    )
};

export default Home;
