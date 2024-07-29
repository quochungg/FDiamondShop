import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ColorMenu = ({ colorArr, menuClickHandler, handleInputChange }) => {

    const allColorTypes = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

    const inputStyle = {
        '&.Mui-checked': {
            color: '#000035',
        },
        '& .MuiSvgIcon-root': { fontSize: 25 }
    }

    return (
        <>
            <div>
                <div className="shadow-filter p-7 w-[500px] mt-5 rounded-md">

                    <div className='flex flex-row items-start font-gantari justify-between'>
                        <p className="font-[600] text-xl mb-5">
                            Color
                        </p>
                        <button onClick={() => menuClickHandler('Clarity')} className="flex items-center justify-center mt-1">
                            <IoCloseOutline size={25} />
                        </button>
                    </div>

                    <ul className="grid grid-cols-4 gap-x-10 gap-y-1">
                        {/* All */}
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('All', colorArr, 'Color')}
                                        checked={colorArr.length === allColorTypes.length ? true : false}
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
                                        onChange={() => handleInputChange('D', colorArr, 'Color')}
                                        checked={colorArr.includes('D') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="D"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('E', colorArr, 'Color')}
                                        checked={colorArr.includes('E') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="E"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('F', colorArr, 'Color')}
                                        checked={colorArr.includes('F') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="F"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('G', colorArr, 'Color')}
                                        checked={colorArr.includes('G') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="G"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('H', colorArr, 'Color')}
                                        checked={colorArr.includes('H') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="H"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('I', colorArr, 'Color')}
                                        checked={colorArr.includes('I') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="I"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('J', colorArr, 'Color')}
                                        checked={colorArr.includes('J') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="J"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('K', colorArr, 'Color')}
                                        checked={colorArr.includes('K') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="K"
                            />
                        </li>


                    </ul>

                </div>
            </div>
        </>
    )
};

export default ColorMenu;
