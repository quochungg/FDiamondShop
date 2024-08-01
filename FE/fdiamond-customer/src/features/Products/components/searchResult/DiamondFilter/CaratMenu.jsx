import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IoCloseOutline } from "react-icons/io5";
import informationSvg from 'src/features/Products/assets/informationSvg.svg';



const CaratMenu = ({ menuClickHandler, handleUpdateSearchParams }) => {

    const handleRadioSelect = (e) => {
        handleUpdateSearchParams(
            JSON.parse(e.target.value)
        );
    }


    return (
        <>
            <div>
                <div className="p-7 w-[400px] rounded-md">

                    <div className='flex flex-row items-start font-gantari justify-between'>
                        <div className="flex flex-row items-center justify-center space-x-2 mb-5">
                            <p className="font-[600] text-xl">
                                Carat
                            </p>

                            <Link to='https://gordonmax.com/wp-content/uploads/2023/05/actual_carat-size-2-jpg.webp' target="_blank">
                                <img src={informationSvg} />
                            </Link>
                        </div>
                        <button onClick={() => menuClickHandler('Carat')} className="flex items-center justify-center mt-1">
                            <IoCloseOutline size={25} />
                        </button>
                    </div>

                    <ul className="grid grid-cols-4 gap-x-10 gap-y-1">



                    </ul>

                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={handleRadioSelect}
                        >
                            <FormControlLabel value={JSON.stringify({
                                caratFrom: 0.00,
                                caratTo: 1.00
                            })}
                                control={<Radio />}
                                label="0.00 to 1.00"
                            />
                            <FormControlLabel value={JSON.stringify({
                                caratFrom: 1.00,
                                caratTo: 2.00
                            })}
                                control={<Radio />}
                                label="1.00 to 2.00"
                            />
                            <FormControlLabel value={JSON.stringify({
                                caratFrom: 2.00,
                                caratTo: 3.00
                            })}
                                control={<Radio />}
                                label="2.00 to 3.00"
                            />
                            <FormControlLabel value={JSON.stringify({
                                caratFrom: 3.00,
                                caratTo: 4.00
                            })}
                                control={<Radio />}
                                label="3.00 to 4.00"
                            />
                            <FormControlLabel value={JSON.stringify({
                                caratFrom: 4.00,
                                caratTo: 5.00
                            })}
                                control={<Radio />}
                                label="4.00 to 5.00"
                            />
                            <FormControlLabel value={JSON.stringify({
                                caratFrom: 5.00,
                            })}
                                control={<Radio />}
                                label="Above 5"
                            />
                        </RadioGroup>
                    </FormControl>

                </div>
            </div>
        </>
    )
};

export default CaratMenu;
