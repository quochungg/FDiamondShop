import Header from "../components/Header"
// import Footer from "../components/Footer"
import Hero from "../components/Hero"
import { useAuth } from "src/context/AuthProvider";

const Home = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <Header />
            <Hero />
            {/* <ProductImages /> */}
            {/* <Footer /> */}

        </>
    )
};

export default Home;
