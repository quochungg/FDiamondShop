import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const CutMenu = ({ cutArr, menuClickHandler, handleInputChange }) => {

    const allCutTypes = ['Good', 'Very Good', 'Excellent', 'Ideal'];

    const inputStyle = {
        '&.Mui-checked': {
            color: '#000035',
        },
        '& .MuiSvgIcon-root': { fontSize: 25 }
    }

    return (
        <>
            <div>
                <div className="shadow-filter p-7 w-[600px] mt-5 rounded-md">

                    <div className='flex flex-row items-start font-gantari justify-between'>
                        <p className="font-[600] text-xl mb-5">
                            Color
                        </p>
                        <button onClick={() => menuClickHandler('Clarity')} className="flex items-center justify-center mt-1">
                            <IoCloseOutline size={25} />
                        </button>
                    </div>

                    <ul className="grid grid-cols-3 gap-x-10 gap-y-1">
                        {/* All */}
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('All', cutArr, 'Cut')}
                                        checked={cutArr.length === allCutTypes.length ? true : false}
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
                                        onChange={() => handleInputChange('Excellent', cutArr, 'Cut')}
                                        checked={cutArr.includes('Excellent') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Excellent"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Ideal', cutArr, 'Cut')}
                                        checked={cutArr.includes('Ideal') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Ideal"
                            />
                        </li>



                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Good', cutArr, 'Cut')}
                                        checked={cutArr.includes('Good') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Good"
                            />
                        </li>


                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Very Good', cutArr, 'Cut')}
                                        checked={cutArr.includes('Very Good') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Very Good"
                            />
                        </li>


                    </ul>

                </div>
            </div>
        </>
    )
};

export default CutMenu;
