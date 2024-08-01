import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import informationSvg from 'src/features/Products/assets/informationSvg.svg';

const ShapeMenu = ({ shapeArr, menuClickHandler, handleInputChange }) => {

    const allShapeTypes = ['Round', 'Oval', 'Emerald', 'Cushion', 'Pear', 'Radiant', 'Princess', 'Marquise', 'Heart', 'Asscher'];

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
                                Shape
                            </p>

                            <Link to='https://cdn.loosegrowndiamond.com/wp-content/uploads/2022/01/Dimaond-Shapes-1.png' target="_blank">
                                <img src={informationSvg} />
                            </Link>
                        </div>

                        <button onClick={() => menuClickHandler('Shape')} className="flex items-center justify-center mt-1">
                            <IoCloseOutline size={25} />
                        </button>
                    </div>


                    <ul className="grid grid-cols-3 gap-x-10 gap-y-1">
                        {/* All */}
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('All', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.length === allShapeTypes.length ? true : false}
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
                                        onChange={() => handleInputChange('Round', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Round') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Round"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Oval', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Oval') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Oval"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Emerald', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Emerald') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Emerald"
                            />
                        </li>


                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Cushion', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Cushion') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Cushion"
                            />
                        </li>



                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Pear', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Pear') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Pear"
                            />
                        </li>



                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Radiant', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Radiant') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Radiant"
                            />
                        </li>



                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Asscher', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Asscher') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Asscher"
                            />
                        </li>



                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Princess', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Princess') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Princess"
                            />
                        </li>



                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Marquise', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Marquise') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Marquise"
                            />
                        </li>



                        <li>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleInputChange('Heart', shapeArr, 'SubcategoryName')}
                                        checked={shapeArr.includes('Heart') ? true : false}
                                        sx={inputStyle}
                                    />
                                }
                                label="Heart"
                            />
                        </li>

                    </ul>

                </div>
            </div>
        </>
    )
};

export default ShapeMenu;
