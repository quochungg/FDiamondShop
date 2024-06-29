import { Link } from 'react-router-dom';
import diamondSvg from '../../assets/diamondSvg.svg';
import earringSvg from '../../assets/earringSvg.svg';
import necklaceSvg from '../../assets/necklaceSvg.svg';
import ringSvg from '../../assets/ringSvg.svg';
import { SingleLineItem, AttachmentLineItem } from '../../components/index';

const CartLinesList = () => {
    return (
        <>
            <div className='font-gantari'>
                <div>
                    <p className='text-xl font-[700] uppercase mb-6'>my cart (10 items)</p>
                </div>

                <SingleLineItem />

                <AttachmentLineItem />

            </div>
        </>
    )
};

export default CartLinesList;
