import * as React from "react";
import {IconButton, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ToggleColorMode from "./ToggleColorMode";
import AccountMenu from "./AccountMenu";
import {ArrowBack, Login} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {RootState} from "lib/store";
import {useDispatch, useSelector} from "react-redux";
import {toggleOpenLogin, toggleOpenRegister} from "../lib/reducers/appSlicer";
import BlogSearch from "../app/blog/posts/components/BlogSearch";


function MyAppBar() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 0;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({behavior: "smooth"});
            if (typeof window !== "undefined") {
                window?.scrollTo({
                    top: targetScroll,
                    behavior: "smooth",
                });
                setOpen(false);
            }
        }
    };

    return (
        <AppBar
            position="sticky"
            color="transparent"
            sx={{
                width: "100%", top: "0px",// border: "solid"
            }}
        >
            <Toolbar sx={{padding: 0}}>
                <Box
                    sx={{
                        display: "flex",
                        px: 0,
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: '100%',
                        maxWidth: "100%"
                    }}
                >
                    <IconButton>
                        <Link href={"/"}>
                            <ArrowBack/>
                        </Link>
                    </IconButton>
                    <BlogSearch/>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.5,
                            alignItems: "center",
                        }}
                    >
                        {loggedAccount ? (
                            <AccountMenu account={loggedAccount}/>
                        ) : (
                            <div>

                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                    onClick={() => dispatch(toggleOpenLogin())}

                                >
                                    <Login sx={{display: {xs: "flex", sm: "none", md: "none",lg:'none',width:"35px"}}}/>
                                    <Typography
                                        sx={{display: {xs: "none", sm: "flex", md: "flex",lg:"flex"}}}
                                    >
                                        Sign in
                                    </Typography>
                                </Button>
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                    onClick={() => dispatch(toggleOpenRegister())}
                                    sx={{display: {xs: "none", sm: "", md: ""}}}
                                >
                                    Sign up
                                </Button>
                            </div>
                        )}

                        <ToggleColorMode/>
                    </Box>
                </Box>


            </Toolbar>
        </AppBar>
    );
}

export default MyAppBar;
