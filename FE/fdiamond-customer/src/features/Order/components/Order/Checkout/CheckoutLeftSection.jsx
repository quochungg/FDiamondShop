
const CheckoutLeftSection = ({ shippingDetails, shippingDetailsErrors, setShippingDetails }) => {

    const userName = JSON.parse(localStorage.getItem('user')).userName;

    const handleShippingDetails = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.id]: e.target.value
        })
    }

    const within10days = new Date();
    within10days.setDate(within10days.getDate() + 10)
    const within10daysFormatted = within10days.toLocaleDateString("en-GB");

    const within14days = new Date();
    within14days.setDate(within14days.getDate() + 14)
    const within14daysFormatted = within14days.toLocaleDateString("en-GB");

    return (
        <>
            <div className='w-full h-auto'>
                {/* CONTACT INFORMATION */}
                <div className='shadow-cartline w-full rounded-md  bg-white p-12'>
                    <p className='uppercase text-xl font-[680]'>Contact information</p>
                    <p className='mt-5 font-[650]'>Email Address</p>
                    <p className='p-3 mt-2 border-[1px] border-gray-400 rounded-md bg-gray-100 text-gray-700'
                    >
                        {userName}
                    </p>
                </div>

                {/* SHIPPING INFORMATION */}
                <div className='shadow-cartline w-full rounded-md  bg-white p-12 mt-10 font-gantari'>

                    <p className='uppercase text-xl font-[680] mb-5'>Shipping & Recepient Details</p>

                    <div className="flex flex-row space-x-5 mb-5">

                        <div className="flex-1 flex flex-col">
                            <label
                                htmlFor='firstName'
                                className="font-[650]"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                className='p-3 mt-2 border-[1px] rounded-md border-blue-950'
                                placeholder="Enter your first name"
                                value={shippingDetails.firstName}
                                onChange={handleShippingDetails}
                            />
                        </div>


                        <div className="flex-1 flex flex-col">
                            <label
                                htmlFor='lastName'
                                className="font-[650]"
                            >
                                Last Name
                            </label>
                            <input
                                id='lastName'
                                className='p-3 mt-2 border-[1px] rounded-md border-blue-950'
                                placeholder="Enter your last name"
                                value={shippingDetails.lastName}
                                onChange={handleShippingDetails}
                            />
                        </div>

                    </div>

                    {/* Name Error */}
                    <div>
                        <p className="text-red-600 font-[500] mb-5">
                            {shippingDetailsErrors.firstName || shippingDetailsErrors.lastName}
                        </p>
                    </div>


                    <div className="flex-1 flex flex-col mb-5">
                        <label
                            htmlFor='address'
                            className="font-[650]"
                        >
                            Address
                        </label>
                        <input
                            id="address"
                            className='p-3 mt-2 border-[1px] rounded-md border-blue-950'
                            placeholder="Enter your address"
                            value={shippingDetails.address}
                            onChange={handleShippingDetails}
                        />
                    </div>

                    {/* Address Error */}
                    <div>
                        <p className="text-red-600 font-[500] mb-5">
                            {shippingDetailsErrors.address}
                        </p>
                    </div>


                    <div className="flex-1 flex flex-col mb-5">
                        <label
                            htmlFor='phoneNumber'
                            className="font-[650]"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            className='p-3 mt-2 border-[1px] rounded-md border-blue-950'
                            placeholder="Enter your phone number"
                            value={shippingDetails.phoneNumber}
                            onChange={handleShippingDetails}
                        />
                    </div>

                    {/* Phone Number Error */}
                    <div>
                        <p className="text-red-600 font-[500] mb-5">
                            {shippingDetailsErrors.phoneNumber}
                        </p>
                    </div>


                    <div className="flex-1 flex flex-col mb-8">
                        <label
                            htmlFor='note'
                            className="font-[650]"
                        >
                            Note
                        </label>
                        <input
                            id="note"
                            className='p-3 mt-2 border-[1px] rounded-md border-blue-950'
                            placeholder="Do you have any note?"
                            value={shippingDetails.note}
                            onChange={handleShippingDetails}
                        />
                    </div>


                    {/* Estimated shipping date */}
                    <div>
                        <p className="font-[600] italic">
                            * Estimated Shipping Date (within 10-14 working days): &nbsp;
                            <span>
                                {within10daysFormatted} - &nbsp;
                            </span>

                            <span>
                                {within14daysFormatted}
                            </span>
                        </p>
                    </div>



                </div>


            </div>

        </>
    )
};

export default CheckoutLeftSection;
