import { useState } from 'react';
import { ClarityMenu, ColorMenu, CutMenu } from 'src/features/Products/components/index';

const DiamondFilter = ({ searchParams, handleResetFilter, handleSearchParams }) => {


    const [showFilterMenu, setFilterMenu] = useState(null);


    let clarityArr = searchParams.get('Clarity') ? searchParams.get('Clarity').split(',') : [];
    let colorArr = searchParams.get('Color') ? searchParams.get('Color').split(',') : [];
    let cutArr = searchParams.get('Cut') ? searchParams.get('Cut').split(',') : [];



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

    const allClarityTypes = ['VS1', 'VS2', 'VVS1', 'VVS2', 'SI1', 'SI2', 'I1', 'I2', 'I3', 'FL', 'IF'];
    const allColorTypes = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const allCutTypes = ['Good', 'Very Good', 'Excellent', 'Ideal'];
    const allCaratTypes = ['VS1', 'VS2', 'VVS1', 'VVS2', 'SI1', 'SI2', 'I1', 'I2', 'I3', 'FL', 'IF'];


    const handleInputChange = (value, arrType, arrTypeName) => {

        // if 'All' is selected, then select all the options
        if (value === 'All') {
            // All of what type:?
            let targetArr = [];
            switch (arrTypeName) {
                case 'Clarity':
                    targetArr = allClarityTypes;

                    break;
                case 'Color':
                    targetArr = allColorTypes;
                    break;
                case 'Cut':
                    targetArr = allCutTypes;
                    break;
                case 'Carat':
                    targetArr = allCaratTypes;
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
            <div className='p-10'>

                {/* Clarity */}
                <div>
                    <div>
                        <button
                            className='border border-blue-950 rounded-full px-7 py-3 hover:bg-gray-100 transition-colors duration-150'
                            onClick={() => menuClickHandler('Clarity')}
                        >
                            Clarity <span>{clarityArr.length > 0 && `(${clarityArr.length})`}</span>
                        </button>
                    </div>

                    {showFilterMenu === 'Clarity' &&
                        <ClarityMenu
                            clarityArr={clarityArr}
                            menuClickHandler={menuClickHandler}
                            handleInputChange={handleInputChange}
                        />
                    }
                </div>



                {/* Color */}
                <div>
                    <div>
                        <button
                            className='border border-blue-950 rounded-full px-7 py-3 hover:bg-gray-100 transition-colors duration-150'
                            onClick={() => menuClickHandler('Color')}
                        >
                            Color <span>{colorArr.length > 0 && `(${colorArr.length})`}</span>
                        </button>
                    </div>

                    {showFilterMenu === 'Color' &&
                        <ColorMenu
                            colorArr={colorArr}
                            menuClickHandler={menuClickHandler}
                            handleInputChange={handleInputChange}
                        />
                    }
                </div>



                {/* Cut */}
                <div>
                    <div>
                        <button
                            className='border border-blue-950 rounded-full px-7 py-3 hover:bg-gray-100 transition-colors duration-150'
                            onClick={() => menuClickHandler('Cut')}
                        >
                            Cut <span>{cutArr.length > 0 && `(${cutArr.length})`}</span>
                        </button>
                    </div>

                    {showFilterMenu === 'Cut' &&
                        <CutMenu
                            cutArr={cutArr}
                            menuClickHandler={menuClickHandler}
                            handleInputChange={handleInputChange}
                        />
                    }
                </div>



                {/* Sort By Price */}
                {/* <div>
                    <ul>

                        <li>
                            <button onClick={() => handleUpdateSearchParams({
                                OrderBy: 'ProductName',
                                SortBy: 'asc'
                            })}>
                                Default (Alphabetical A-Z)
                            </button>
                        </li>


                        <li>
                            <button onClick={() => handleUpdateSearchParams({
                                OrderBy: 'ProductName',
                                SortBy: 'desc'
                            })}>
                                Default (Alphabetical Z-A)
                            </button>
                        </li>


                        <li>
                            <button onClick={() => handleUpdateSearchParams({
                                OrderBy: 'BasePrice',
                                SortBy: 'asc'
                            })}>
                                Low to High
                            </button>
                        </li>


                        <li>

                            <button onClick={() => handleUpdateSearchParams({
                                OrderBy: 'BasePrice',
                                SortBy: 'desc'
                            })}>
                                High to Low
                            </button>
                        </li>
                    </ul>
                </div> */}



                {/* 
                <div>
                    <label>Clarity</label>
                    <select
                        onChange={() => handleUpdateSearchParams({
                            Clarity: event.target.value
                        })}>
                        <option value="All">All</option>
                        <option value="FL">FL</option>
                        <option value="IF">IF</option>
                        <option value="VVS1">VVS1</option>
                        <option value="VVS2">VVS2</option>
                        <option value="VS1">VS1</option>
                        <option value="VS2">VS2</option>
                        <option value="SI1">SI1</option>
                        <option value="SI2">SI2</option>
                        <option value="I1">I1</option>
                        <option value="I2">I2</option>
                        <option value="I3">I3</option>
                    </select>

                </div> */}





                <div>
                    <button
                        onClick={handleResetFilter}
                        className="text-sm text-gray-500"
                    >
                        Reset Filter
                    </button>
                </div>
            </div>
        </>
    )
};

export default DiamondFilter;
