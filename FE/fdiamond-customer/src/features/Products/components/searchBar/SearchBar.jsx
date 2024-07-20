import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

const SearchBar = ({ keyword, setKeyword }) => {

    const [typedKeyword, setTypedKeyword] = useState(keyword || '');

    return (
        <>
            <div className="flex">

                <div className="w-full flex relative">

                    <input
                        type="text"
                        placeholder="Search products by name"
                        value={typedKeyword}
                        onChange={(e) => setTypedKeyword(e.target.value)}
                        className="border border-black outline-none pl-5 pr-12 w-full rounded-l-md text-lg"
                    />

                    <button
                        onClick={() => setTypedKeyword('')}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                        <div>
                            <IoCloseOutline size={28} />
                        </div>
                    </button>
                </div>

                <button
                    onClick={() => setKeyword(typedKeyword)}
                    className="flex items-center justify-center
                              bg-black w-20 h-14 rounded-r-md"
                >
                    <div>
                        <IoIosSearch size={30} color="#fff" />
                    </div>
                </button>

            </div>


        </>
    )
};

export default SearchBar;
