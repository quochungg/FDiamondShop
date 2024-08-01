import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import informationSvg from 'src/features/Products/assets/informationSvg.svg';


const MetalMenu = ({ metalArr, menuClickHandler, handleInputChange }) => {

    const allMetalTypes = ['14k White Gold', '18k White Gold', '14k Yellow Gold', '18k Yellow Gold', '14k Rose Gold', '18k Rose Gold', 'Platinum'];

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
                                Metal
                            </p>

                            <Link to='' target="_blank">
                                <img src={informationSvg} />
                            </Link>
                        </div>

                        <button onClick={() => menuClickHandler('Metal')} className="flex items-center justify-center mt-1">
                            <IoCloseOutline size={25} />
                        </button>
                    </div>


                    <ul className="grid grid-cols-3 gap-x-4 gap-y-1">
                        {/* All */}
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('All', metalArr, 'Metal')}
                                        checked={metalArr.length === allMetalTypes.length ? true : false}
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
                                        onChange={() => handleInputChange('14k White Gold', metalArr, 'Metal')}
                                        checked={metalArr.includes('14k White Gold') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="14k White Gold"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('18k White Gold', metalArr, 'Metal')}
                                        checked={metalArr.includes('18k White Gold') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="18k White Gold"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('14k Yellow Gold', metalArr, 'Metal')}
                                        checked={metalArr.includes('14k Yellow Gold') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="14k Yellow Gold"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('18k Yellow Gold', metalArr, 'Metal')}
                                        checked={metalArr.includes('18k Yellow Gold') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="18k Yellow Gold"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('14k Rose Gold', metalArr, 'Metal')}
                                        checked={metalArr.includes('14k Rose Gold') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="14k Rose Gold"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('18k Rose Gold', metalArr, 'Metal')}
                                        checked={metalArr.includes('18k Rose Gold') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="18k Rose Gold"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Platinum', metalArr, 'Metal')}
                                        checked={metalArr.includes('Platinum') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Platinum"
                            />
                        </li>

                    </ul>

                </div>
            </div>
        </>
    )
};

export default MetalMenu;
