import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import ringSvg from 'src/features/Order/assets/ringSvg.svg';


const SelectionBar = () => {
    return (
        <>
            <div className="flex flex-row content-center py-11 px-28">
                <div className="grid grid-cols-3 border-[1px] border-black w-full h-[85px] rounded-full">
                    <div className='border-black border-r-[1px] flex items-center'>
                        <div className="">
                            1. Choose a Ring
                        </div>
                        <div>
                            <img
                                src={ringSvg}
                                className='object-cover w-full h-full'
                            />
                        </div>
                    </div>

                    <div>

                    </div>

                    <div className="border-black border-r-[1px]">2. Choose a Diamond</div>
                    <div className="">3. Complete Selection</div>
                </div>
            </div>
        </>
    )
};

export default SelectionBar;
