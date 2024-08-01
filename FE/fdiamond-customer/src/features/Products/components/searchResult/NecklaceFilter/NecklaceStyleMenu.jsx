import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import informationSvg from 'src/features/Products/assets/informationSvg.svg';

const NecklaceStyleMenu = ({ styleArr, menuClickHandler, handleInputChange }) => {

    const allStyleTypes = ['Cross', 'Halo', 'Gemstone', 'Pearl'];

    const inputStyle = {
        '&.Mui-checked': {
            color: '#000035',
        },
        '& .MuiSvgIcon-root': { fontSize: 25 }
    }

    return (
        <>
            <div>
                <div className="p-7 w-[600px]  rounded-md">

                    <div className='flex flex-row items-start font-gantari justify-between'>
                        <div className="flex flex-row items-center justify-center space-x-2 mb-5">
                            <p className="font-[600] text-xl">
                                Style
                            </p>

                            <Link to='' target="_blank">
                                <img src={informationSvg} />
                            </Link>
                        </div>

                        <button onClick={() => menuClickHandler('Style')} className="flex items-center justify-center mt-1">
                            <IoCloseOutline size={25} />
                        </button>
                    </div>


                    <ul className="grid grid-cols-3 gap-x-10 gap-y-1">
                        {/* All */}
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('All', styleArr, 'SubcategoryName')}
                                        checked={styleArr.length === allStyleTypes.length ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="All"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Cross', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Cross') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Cross"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Halo', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Halo') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Halo"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Gemstone', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Gemstone') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Gemstone"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Pearl', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Pearl') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Pearl"
                            />
                        </li>

                    </ul>

                </div>
            </div>
        </>
    )
};

export default NecklaceStyleMenu;
