import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const ClarityMenu = ({ clarityArr, menuClickHandler, handleInputChange }) => {

    const allClarityTypes = ['VS1', 'VS2', 'VVS1', 'VVS2', 'SI1', 'SI2', 'I1', 'I2', 'I3', 'FL', 'IF'];

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
                            Clarity
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
                                        onChange={() => handleInputChange('All', clarityArr, 'Clarity')}
                                        checked={clarityArr.length === allClarityTypes.length ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="All"
                            />
                        </li>


                        {/* VS1, VS2, VVS1, VVS2 */}


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('VS1', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('VS1') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="VS1"
                            />
                        </li>

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('VS2', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('VS2') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="VS2"
                            />
                        </li>

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('VVS1', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('VVS1') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="VVS1"
                            />
                        </li>

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('VVS2', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('VVS2') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="VVS2"
                            />
                        </li>




                        {/* SI1, SI2*/}

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('SI1', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('SI1') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="SI1"
                            />
                        </li>

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('SI2', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('SI2') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="SI2"
                            />
                        </li>




                        {/* I1, I2, I3 */}
                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('I1', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('I1') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="I1"
                            />
                        </li>

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('I2', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('I2') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="I2"
                            />
                        </li>

                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('I3', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('I3') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="I3"
                            />
                        </li>


                        {/* FL, IF */}


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('FL', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('FL') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="FL"
                            />
                        </li>

                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('IF', clarityArr, 'Clarity')}
                                        checked={clarityArr.includes('IF') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="IF"
                            />
                        </li>


                    </ul>

                </div>
            </div>

        </>
    )
};

export default ClarityMenu;
