import { TailSpin } from "react-loader-spinner";

const LoadingSpinner = () => {

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <TailSpin
                    visible={true}
                    height="50"
                    color="#e5e5e5"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperClass="flex flex-row justify-center"
                />
            </div>
        </>
    )
};

export default LoadingSpinner;
