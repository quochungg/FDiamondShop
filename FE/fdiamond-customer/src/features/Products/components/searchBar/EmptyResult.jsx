import { Link } from "react-router-dom";

const EmptyResult = ({ keyword }) => {
    return (
        <>
            <div>
                <p className="text-lg text-gray-500 uppercase font-[700] tracking-wide"
                >
                    No results found
                </p>

                <div className="flex flex-col space-y-3 mt-5 mb-7">
                    <p>
                        Sorry, no results found for
                        <span className="font-[700]"> {keyword}</span>
                    </p>
                    <p>
                        Try expanding your search or speak to one of our friendly
                        <span>
                            <Link to="tel:1800545457"> <span className="underline underline-offset-2">customer service</span> </Link>
                        </span>
                        reps.
                    </p>
                </div>

                <div>
                    <p className="text-lg text-gray-500 uppercase font-[700] tracking-wide"
                    >
                        WERE YOU LOOKING FOR:
                    </p>

                    <div className="flex flex-row underline underline-offset-2 text-md text-gray-500 tracking-wide pt-5">
                        <div className="flex flex-col space-y-7 mr-28">
                            <Link to='/product/diamond'>Diamonds</Link>
                            <Link to='/product/engagement ring'>Engagement Rings</Link>
                        </div>

                        <div className="flex flex-col space-y-7">
                            <Link to='/product/earring'>Earrings</Link>
                            <Link to='/product/necklace'>Necklaces</Link>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
};

export default EmptyResult;
