
const OrderDetailsLeftSection = ({ orderDetails }) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;

    return (
        <>
            <div className='w-full'>

                <div className='shadow-cartline w-full rounded-md  bg-white p-12'>
                    <p className='uppercase text-xl font-[680]'>Contact information</p>
                    <p className='mt-5 font-[650]'>Email Address</p>
                    <p className='p-3 mt-2 border-[1px] border-gray-400 rounded-md bg-gray-100 text-gray-700'
                    >
                        {userName}
                    </p>
                </div>

                <div className='shadow-cartline w-full rounded-md bg-white p-12 mt-8'>
                    <p className='uppercase text-xl font-[680]'>SHIPPING</p>
                </div>

            </div>

        </>
    )
};

export default OrderDetailsLeftSection;
