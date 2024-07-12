import { Link } from "react-router-dom";

const SuccessfulPaymentPage = () => {



    return (
        <>
            <div className="">
                <div>Successful Payment Page</div>
                <div className="mt-10">
                    <Link to='/'
                        className="bg-blue-950 text-white p-5"
                    >
                        Go To Homepage</Link>
                </div>
            </div>


        </>
    )
};

export default SuccessfulPaymentPage;
