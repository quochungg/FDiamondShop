import { Header, Footer } from 'src/components/index'

const AppLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
};

export default AppLayout;