import { useNavigate } from 'react-router-dom';
import diamondSelectionSvg from 'src/features/Products/assets/diamondSelectionSvg.svg';
import ringSelectionSvg from 'src/features/Products/assets/ringSelectionSvg.svg';

const SelectionBar = ({ showAddToCart }) => {
    const navigate = useNavigate();

    const handleAddToCart = async () => {

        const selectionBar = JSON.parse(localStorage.getItem('selectionBar')); //AddToCart button is visible => there are both ring and diamond object in local storage        

        const addedItemArr = [
            {
                productId: selectionBar.engagementRing.item.productId,
                ringSize: selectionBar.engagementRing.size
            },
            {
                productId: selectionBar.diamond.productId,
                ringSize: 0
            }
        ]

        navigate('/cart', {
            state: {
                ...location.state,
                previousUrl: location.pathname,
                addedItemArr: addedItemArr
            }
        });

        //set null for local storage
        localStorage.removeItem('selectionBar');
    }

    return (
        <>
            <div className="flex flex-row content-center py-11 px-28">
                <div className="grid grid-cols-3 border-[1px] border-black w-full h-[85px] rounded-full 
                font-gantari text-lg capitalize">

                    <div className='border-black border-r-[1px] flex items-center justify-between w-full px-8'>
                        <div className="">
                            1. Choose a Diamond
                        </div>
                        <div className='w-6 flex justify-center'>
                            <img
                                src={diamondSelectionSvg}
                                className='object-cover w-full h-full'
                            />
                        </div>
                    </div>


                    <div className='border-black border-r-[1px] flex items-center justify-between w-full px-8'>
                        <div className="">
                            2. Choose a Ring
                        </div>
                        <div>
                            <img
                                src={ringSelectionSvg}
                                className='object-cover w-full h-full'
                            />
                        </div>
                    </div>


                    <div className='border-black flex items-center justify-between w-full px-8'>
                        <div className="">
                            3. Complete Selection
                        </div>
                        {showAddToCart &&
                            <button
                                className='bg-gray-300'
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                        }
                    </div>


                </div>
            </div>
        </>
    )
};

export default SelectionBar;
