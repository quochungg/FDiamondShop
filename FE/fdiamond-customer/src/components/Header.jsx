import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import {
    Typography,
    AppBar,
    Toolbar,
    Stack,
    // Grid,
    // Container,
    // IconButton,
    // Button,
    Box,
} from "@mui/material";

// const handleSearchOnclick = (e) => {
//   e.preventDefault();
// }

const Header = () => {
    console.log('Header renders')

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 0 14px 0",
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 40px !important",
                    }}
                >
                    <Link to="location">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 0.5,
                            }}
                        >
                            <MdLocationPin size={17} />
                            <Typography>Location</Typography>
                        </Box>
                    </Link>

                    <Link to="consult">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 0.5,
                                marginLeft: "25px",
                            }}
                        >
                            <MdOutlinePhoneInTalk size={17} />
                            <Typography variant="body2">Consult</Typography>
                        </Box>
                    </Link>

                    <Box sx={{ width: "100vw", textAlign: "center" }}>
                        <Typography variant="h4" fontFamily="serif">
                            <Link to="/">FDIAMOND</Link>
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2.5 }}>
                        <Link to="search">
                            <IoIosSearch size={20} />
                        </Link>
                        <Link to="login">
                            <VscAccount size={20} />
                        </Link>
                        <Link to="cart">
                            <AiOutlineShopping size={20} />
                        </Link>
                    </Box>
                </Toolbar>

                <Stack
                    direction="row"
                    spacing={8}
                    sx={{
                        paddingTop: "13px",
                        borderTop: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Link to="/product/diamond">Diamonds</Link>
                    <Link to="/product/engagement ring">Engagement Rings</Link>
                    <Link to="/product/earring">Earrings</Link>
                    <Link to="/product/necklace">Necklaces</Link>
                </Stack>
            </AppBar>
        </>
    );
};

export default Header;
