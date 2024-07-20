
const VoucherItem = ({ voucherItem }) => {

    const dateString = voucherItem.endDate;

    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });


    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // Ensures the time is in AM/PM format
    });


    return (
        <>

            <div className="w-full flex flex-row bg-[#000035] h-[16.5rem] rounded-md">
                <div className="w-[30%] h-full mb-10 uppercase tracking-wider
                flex flex-col justify-center items-center bg-gradient-to-r from-yellow-500 to-yellow-100 bg-clip-text text-transparent relative"
                >

                    <p className="text-2xl font-[500]">discount</p>
                    <p className="text-6xl font-poppins font-[700] my-3">{voucherItem.discountPercent} %</p>
                    <p className="font-[380]">all items</p>
                </div>

                <div className="w-[70%] h-full text-white border-l-2 border-white border-dashed relative">

                    <p className="uppercase text-center my-6 text-2xl font-playfair tracking-wider font-[700]
                        text-yellow-500"
                    >
                        Special Offer
                    </p>


                    <div className="flex flex-col justify-center items-center">

                        <p className="text-yellow-500 uppercase font-gantari bg-[#000035] font-[600]
                        text-center relative z-10 mx-auto w-auto px-2 text-sm"
                        >
                            Promo Code
                        </p>

                        <p className="uppercase font-gantari tracking-wider text-center text-yellow font-[550] 
                        bg-gradient-to-r from-yellow-500 to-yellow-100 bg-clip-text text-transparent 
                        w-[70%] rounded-sm py-6 border-2 border-yellow-600 relative mt-[-12px]"
                        >
                            <span className="font-[750] text-3xl">{voucherItem.discountCodeName}</span>
                        </p>


                        <p className="capitalize mt-5 font-gantari
                        bg-gradient-to-r from-yellow-500 to-yellow-100 bg-clip-text text-transparent "
                        >
                            Expires {formattedDate}
                            <span className="lowercase"> at </span>
                            {formattedTime}
                        </p>

                    </div>

                    <div className="absolute bottom-6 right-7 w-9 h-9 rounded-full bg-yellow-500 
                    flex justify-center items-center
                    text-[#000035] font-[700] text-xl font-playfair outline outline-2 outline-offset-4 outline-yellow-500"
                    >
                        F
                    </div>

                </div>
            </div>

        </>
    )
};

export default VoucherItem;
