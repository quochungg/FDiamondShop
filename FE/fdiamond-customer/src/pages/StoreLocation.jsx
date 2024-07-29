import AppLayout from "src/layout/AppLayout";
import { FaLocationDot } from "react-icons/fa6";

const StoreLocation = () => {
    return (
        <>
            <AppLayout>
                <div className="w-[70%] mx-auto py-10 mb-16">

                    <div className="mb-5">
                        <p className="font-lora capitalize text-2xl font-[500]">Visit our showrooms</p>
                    </div>

                    <div className="font-gantari flex flex-col space-y-5 text-lg font-[350] mb-14">

                        <p>
                            We are constantly innovating and finding new ways to help you discover, design and delight in the perfect piece of jewelry. With jewelry store locations throughout the country, we are proud to be the local jeweler of choice for engagement rings, custom pieces and any other jewelry you may need.
                        </p>

                        <p>
                            Our showrooms provide our clients an opportunity to look, touch and try on our superior selection of jewelry and engagement rings when making a purchase.
                        </p>

                        <p>
                            Our showrooms offer an array of pieces that represent our FDIAMOND story and our personal jewelers are available to guide you through the process of finding the perfect piece or designing a stunning custom creation. Once you have made your purchase, your order will be shipped directly to you, free of charge.
                        </p>

                        <p>
                            You can also visit our showroom locations for repairs and upkeep of rings, necklaces, earrings and any other pieces needing expert care. Visit your nearest FDIAMOND jewelry store for cleaning, sizing and repairs. Our personal jewelers are there for you, participating in life’s joyful occasions as your jeweler of choice. Find your nearest FDIAMOND location below.
                        </p>

                    </div>


                    <div className="mb-10 text-lg">
                        <p className="font-lora text-2xl font-[450] mb-5">Ho Chi Minh</p>

                        <ul className="list-none font-gantari grid grid-cols-3 gap-y-3 font-[350]">

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Satra Centre Mall Cu Chi</p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store 76 No Trang Long</p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store BigC An Lac </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store 338 Phan Dinh Phung </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store AEON Binh Tan </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Co.op Xtra Su Van Hanh </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store 459 Truong Chinh </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store AEON Tan Phu </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Co.opmart Cu Chi </p>
                            </li>


                        </ul>

                    </div>


                    <div className="text-lg">
                        <p className="font-lora text-2xl font-[450] mb-5">Ha Noi</p>

                        <ul className="list-none font-gantari grid grid-cols-3 gap-y-3 font-[350]">

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Aeon Ha Noi </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Savico – Long Bien </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Vincom Nguyen Chi Thanh </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Aeon Style Cau Giay </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Vincom Royal  </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Co.op Xtra BigC Thang Long  </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Vincom Mega Mall Time City  </p>
                            </li>

                            <li className="flex flex-row items-center space-x-2">
                                <span><FaLocationDot size={23} /></span>
                                <p>Store Vincom Tran Duy Hung </p>
                            </li>


                        </ul>

                    </div>

                </div>




            </AppLayout>
        </>
    )
};

export default StoreLocation;
