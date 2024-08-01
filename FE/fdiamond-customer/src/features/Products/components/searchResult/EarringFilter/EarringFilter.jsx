import { useState } from "react";
import { EarringStyleMenu, MetalMenu } from 'src/features/Products/components/index';


const EarringFilter = ({ searchParams, handleSearchParams }) => {

    const [showFilterMenu, setFilterMenu] = useState(null);

    const menuClickHandler = (param) => {
        if (showFilterMenu === param) {  // this is when the same menu is clicked again, close the menu
            setFilterMenu(null);
        } else {
            setFilterMenu(param);
        }
    };


    const handleUpdateSearchParams = (props) => {
        handleSearchParams({
            ...props,
        })
    }


    let styleArr = searchParams.get('SubcategoryName') ? searchParams.get('SubcategoryName').split(',') : [];
    let metalArr = searchParams.get('Metal') ? searchParams.get('Metal').split(',') : [];

    const allStyleTypes = ['Hoop', 'Stud', 'Drop', 'Gemstone'];
    const allMetalTypes = ['14k White Gold', '18k White Gold', '14k Yellow Gold', '18k Yellow Gold', '14k Rose Gold', '18k Rose Gold', 'Platinum'];


    const handleInputChange = (value, arrType, arrTypeName) => {
        // if 'All' is selected, then select all the options
        if (value === 'All') {
            // All of what type:?
            let targetArr = [];
            switch (arrTypeName) {
                case 'SubcategoryName':
                    targetArr = allStyleTypes;
                    break;
                case 'Metal':
                    targetArr = allMetalTypes;
                    break;
            }

            if (arrType.length === targetArr.length) {
                handleUpdateSearchParams({
                    [arrTypeName]: []
                })
            }
            else {
                handleUpdateSearchParams({
                    [arrTypeName]: targetArr
                })
            }
            return;
        }


        if (arrType.includes(value)) {
            handleUpdateSearchParams({
                [arrTypeName]: arrType.filter(item => item !== value)  // remove the value from the array if unchecked
            })
        }
        else {
            handleUpdateSearchParams({
                [arrTypeName]: [...arrType, value]
            })
        }
    }

    return (
        <>
            <div className='flex flex-col relative space-y-7'>
                <div className='absolute top-[-45px] w-96'>
                    <p className="text-4xl font-lora text-white"
                    >
                        Earring Selection
                    </p>
                </div>

                <div className='flex flex-row items-center space-x-3'>

                    {/* Style */}
                    <div>
                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Style')}
                            >
                                Style <span>{styleArr.length > 0 && `(${styleArr.length})`}</span>
                            </button>

                            {showFilterMenu === 'Style' &&
                                <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                    <EarringStyleMenu
                                        styleArr={styleArr}
                                        menuClickHandler={menuClickHandler}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>


                    {/* Metal */}
                    <div>
                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Metal')}
                            >
                                Metal <span>{metalArr.length > 0 && `(${metalArr.length})`}</span>
                            </button>

                            {showFilterMenu === 'Metal' &&
                                <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                    <MetalMenu
                                        metalArr={metalArr}
                                        menuClickHandler={menuClickHandler}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default EarringFilter;
