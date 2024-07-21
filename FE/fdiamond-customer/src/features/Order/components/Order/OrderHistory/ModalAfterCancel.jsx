import { PiCheckCircleThin } from "react-icons/pi";


const ModalAfterCancel = ({ handleCloseModal }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">

                <div className="fixed inset-0 bg-black opacity-20"></div>

                <div className="z-10 bg-white p-8 rounded-md shadow-lg w-[40%] h-auto text-center">

                    <div className="bg-[#D6EFD8] rounded-full inline-block"
                    >
                        <PiCheckCircleThin size={100} color="green" />
                    </div>

                    <p className="capitalize font-lora text-2xl font-[800] mt-5">Your order has been successfully cancelled</p>

                    <p className="mt-5 font-[380] bg-slate-200 rounded-sm py-3 border-[1px] border-blue-950 border-dashed">We have sent an email to your registered address with details regarding the cancellation and any next steps you may need to take. Please check your inbox and spam folder.</p>

                    <div className="mt-7">
                        <button onClick={handleCloseModal}>
                            <p className="bg-blue-950 text-white px-16 py-2 text-xl rounded-md font-semibold">OK</p>
                        </button>
                    </div>

                </div>




            </div>
        </>
    )
};

export default ModalAfterCancel;
