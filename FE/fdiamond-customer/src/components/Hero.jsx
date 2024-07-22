import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <div className='relative w-full h-[30rem] text-white'>
                    <img
                        src="https://dam.bluenile.com/images/public/24282/diamonds.jpeg"
                        className="w-full h-full object-cover absolute"
                        style={{ transform: 'scaleX(-1)' }}

                    />

                    <div className="absolute flex flex-col justify-end items-end text-end w-[40%] right-16 top-1/2 -translate-y-1/2">
                        <p className='text-6xl font-lora mb-8 capitalize font-[450]'>Sparkle with us</p>
                        <p className="mb-10">
                            {/* At Diamonds Direct, we pride ourselves not only on our stunning
                            collection of jewelry but also on the array of additional services
                            we offer to enhance your jewelry experience. From meticulous
                            repairs to comprehensive appraisals, we are here to meet all your
                            jewelry needs. */}
                            Superior brilliance is in the cut. Discover the brightest diamonds in our collection, crafted by highly skilled artisans to outshine the rest
                        </p>

                        <div className="flex flex-row space-x-5">
                            <button
                                onClick={() => navigate('/product')}
                                className='text-black bg-white w-72 font-[400] py-4 uppercase text-lg font-gantari rounded-sm mx-auto hover:bg-gray-200 transition-colors duration-300'
                            >
                                Start with a diamond
                            </button>
                            <button
                                onClick={() => navigate('/product/engagement ring')}
                                className='text-black bg-white w-72 font-[400] py-4 uppercase text-lg font-gantari rounded-sm mx-auto hover:bg-gray-200 transition-colors duration-300'
                            >
                                Start with a setting
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
