import { useState, useEffect } from 'react';
import { LoadingSpinner } from 'src/components';
import { PiCheckCircleThin } from "react-icons/pi";

const SuccessfulVerificationPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="h-screen bg-gray-50 flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="h-screen bg-gray-50 flex justify-center items-center">
                    <div className="w-[50%] pt-6 pb-14 flex flex-col justify-center items-center 
                bg-white rounded-sm shadow-md border-t-[1px]">
                        <PiCheckCircleThin size={170} color="green" />
                        <p className="text-[2.4rem] font-gantari font-[600] leading-none mt-2">Email Verified!</p>

                        <div className="font-gantari text-lg font-[300] text-center
                    mt-6 flex flex-col items-center justify-center space-y-4 ">
                            <p>Your new account has been successfully activated.</p>
                            <p>You can log in to your account to start making purchase now.</p>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
};

export default SuccessfulVerificationPage;
