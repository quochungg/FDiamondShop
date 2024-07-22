import AppLayout from "src/layout/AppLayout";
import { Hero, ShopDiamondByShape, ShopByCategory } from "src/components";
import { useAuth } from "src/context/AuthProvider";

const Home = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <AppLayout>
                {/* <button onClick={handleLogout}>Logout</button> */}

                <Hero />

                <ShopDiamondByShape />

                <ShopByCategory />

                {/* <ProductImages /> */}
                {/* <Footer /> */}
            </AppLayout>


        </>
    )
};

export default Home;
