import { Link } from 'react-router-dom';
import emptyCartSvg from '../../assets/emptyCartSvg.svg'

const EmptyCart = () => {
    return (
        <>
            <div className="h-auto flex flex-col justify-center items-center pt-36 pb-64">
                <div>
                    <img src={emptyCartSvg} alt="empty-cart" />
                </div>


                <div className="font-gantari flex flex-col space-y-6 text-center mt-2">
                    <h2 className="text-2xl font-[650] font-gantari tracking-wide">Your shopping cart is empty</h2>
                    <p className="text-lg font-[350]">Looks like you haven't added any items to your cart yet.</p>
                </div>

                <div className='mt-12'>
                    <Link
                        to="/product"
                        className="text-white text-lg uppercase font-gantari font-[450] bg-blue-950 hover:bg-[#34427b] px-20 py-5 rounded-sm "
                    >
                        Shop Now
                    </Link>
                </div>
            </div>

        </>
    )
};

export default EmptyCart;
