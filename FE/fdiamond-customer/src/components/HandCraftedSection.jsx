import { Link } from "react-router-dom";


const HandCraftedSection = () => {
    return (
        <>
            <div>
                <div className="flex h-[450px] mx-12 bg-gray-100 mb-20 font-gantari">

                    <div className="flex-1 flex flex-col p-12 justify-center items-center text-center">
                        <p className="text-4xl font-lora mb-7 font-[500] tracking-wide">Handcrafted In Ho Chi Minh</p>
                        <p className="mb-12">
                            Our highly skilled artisans exceed industry standards with sparkling GIA-graded natural diamonds, the finest-quality materials and outstanding engagement ring design at an amazing value.
                        </p>

                        <div>
                            <Link to='/no-content'
                                className="text-white bg-[#000035] py-4 px-12 font-semibold tracking-wide font-gantari rounded-sm
                                hover:bg-[#26265c] transition-colors duration-300">
                                About FDIAMOND
                            </Link>
                        </div>

                    </div>

                    <div className="flex-1 h-full">
                        <img src='https://ecommo--ion.bluenile.com/static-dyo-bn/Handcrafted_v1.6ae02.jpg'
                            className="w-full h-full object-cover"
                        />
                    </div>




                </div>
            </div>

        </>
    )
};

export default HandCraftedSection;
