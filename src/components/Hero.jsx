import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <>
            <div>
                <div className='relative w-full h-[30rem]'>
                    <img
                        src="https://diamonds.com/wp-content/uploads/2018/07/elegant-hairstyle4_V3.jpg"
                        className="w-full h-full object-cover absolute"
                    />
                    <div className="absolute flex flex-col">
                        <p className='text-5xl font-serif'>Welcome To FDiamond</p>
                        <p>
                            At Diamonds Direct, we pride ourselves not only on our stunning
                            collection of jewelry but also on the array of additional services
                            we offer to enhance your jewelry experience. From meticulous
                            repairs to comprehensive appraisals, we are here to meet all your
                            jewelry needs.
                        </p>
                        <Link
                            to='searchResultPage'
                            className='p-3 bg-pink text-center w-[10rem] hover:bg-[#da756c] rounded-sm'
                        >
                            Discover
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
