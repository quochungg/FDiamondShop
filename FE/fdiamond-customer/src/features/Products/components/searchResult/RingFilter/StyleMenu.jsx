import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import informationSvg from 'src/features/Products/assets/informationSvg.svg';


const StyleMenu = ({ styleArr, menuClickHandler, handleInputChange }) => {

    const allStyleTypes = ['Halo', 'Vintage', 'Three-Stone', 'Two-Stone', 'Solitaire', 'Sidestone'];

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
                                        onChange={() => handleInputChange('Vintage', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Vintage') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Vintage"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Solitaire', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Solitaire') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Solitaire"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Three-Stone', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Three-Stone') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Three-Stone"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Two-Stone', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Two-Stone') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Two-Stone"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Sidestone', styleArr, 'SubcategoryName')}
                                        checked={styleArr.includes('Sidestone') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Sidestone"
                            />
                        </li>

                    </ul>

                </div>
            </div>
        </>
    )
};

export default StyleMenu;
