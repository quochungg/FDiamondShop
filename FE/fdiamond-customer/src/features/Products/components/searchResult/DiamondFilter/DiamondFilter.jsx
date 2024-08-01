import { useState } from 'react';
import { ShapeMenu, ClarityMenu, ColorMenu, CutMenu, CaratMenu } from 'src/features/Products/components/index';


const DiamondFilter = ({ searchParams, handleSearchParams }) => {


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


    let shapeArr = searchParams.get('SubcategoryName') ? searchParams.get('SubcategoryName').split(',') : [];
    let clarityArr = searchParams.get('Clarity') ? searchParams.get('Clarity').split(',') : [];
    let colorArr = searchParams.get('Color') ? searchParams.get('Color').split(',') : [];
    let cutArr = searchParams.get('Cut') ? searchParams.get('Cut').split(',') : [];


    const allShapeTypes = ['Round', 'Oval', 'Emerald', 'Cushion', 'Pear', 'Radiant', 'Princess', 'Marquise', 'Heart', 'Asscher'];
    const allClarityTypes = ['VS1', 'VS2', 'VVS1', 'VVS2', 'SI1', 'SI2', 'I1', 'I2', 'I3', 'FL', 'IF'];
    const allColorTypes = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const allCutTypes = ['Good', 'Very Good', 'Excellent', 'Ideal'];



    const handleInputChange = (value, arrType, arrTypeName) => {

        // if 'All' is selected, then select all the options
        if (value === 'All') {
            // All of what type:?
            let targetArr = [];
            switch (arrTypeName) {
                case 'SubcategoryName':
                    targetArr = allShapeTypes;
                    break;
                case 'Clarity':
                    targetArr = allClarityTypes;
                    break;
                case 'Color':
                    targetArr = allColorTypes;
                    break;
                case 'Cut':
                    targetArr = allCutTypes;
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
                <div className='absolute top-[-50px] left-56'>
                    <p className="text-4xl font-lora text-white"
                    >
                        Diamond 4Cs
                    </p>
                </div>

                <div className='flex flex-row items-center space-x-3'>

                    {/* Shape */}
                    <div>


                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Shape')}
                            >
                                Shape <span>{shapeArr.length > 0 && `(${shapeArr.length})`}</span>
                            </button>

                            {showFilterMenu === 'Shape' &&
                                <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                    <ShapeMenu
                                        shapeArr={shapeArr}
                                        menuClickHandler={menuClickHandler}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            }
                        </div>

                    </div>


                    {/* Clarity */}
                    <div>
                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Clarity')}
                            >
                                Clarity <span>{clarityArr.length > 0 && `(${clarityArr.length})`}</span>
                            </button>

                            {showFilterMenu === 'Clarity' &&
                                <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                    <ClarityMenu
                                        clarityArr={clarityArr}
                                        menuClickHandler={menuClickHandler}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>



                    {/* Color */}
                    <div>
                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Color')}
                            >
                                Color <span>{colorArr.length > 0 && `(${colorArr.length})`}</span>
                            </button>

                            {showFilterMenu === 'Color' &&
                                <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                    <ColorMenu
                                        colorArr={colorArr}
                                        menuClickHandler={menuClickHandler}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>



                    {/* Cut */}
                    <div>
                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Cut')}
                            >
                                Cut <span>{cutArr.length > 0 && `(${cutArr.length})`}</span>
                            </button>

                            <div>
                                {showFilterMenu === 'Cut' &&
                                    <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                        <CutMenu
                                            cutArr={cutArr}
                                            menuClickHandler={menuClickHandler}
                                            handleInputChange={handleInputChange}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                    {/* Carat */}
                    <div>
                        <div className='relative'>
                            <button
                                className='border border-white rounded-full px-8 py-3 hover:bg-gray-100 transition-colors duration-150 text-white hover:text-black'
                                onClick={() => menuClickHandler('Carat')}
                            >
                                Carat
                            </button>

                            <div className='absolute z-50 bg-white rounded-md shadow-filter top-[75px]'>
                                {showFilterMenu === 'Carat' &&
                                    <CaratMenu
                                        menuClickHandler={menuClickHandler}
                                        handleInputChange={handleInputChange}
                                        handleUpdateSearchParams={handleUpdateSearchParams}
                                    />
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
};

export default DiamondFilter;
