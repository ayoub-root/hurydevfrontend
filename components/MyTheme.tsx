// components/ThemeProvider.js
"use client";
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import getLPTheme from "app/getLPTheme";
import {RootState} from "lib/store";

import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {hideWarning} from "lib/reducers/warningSlicer";

import {SnackbarProvider, useSnackbar, VariantType} from "notistack";
import useCheckLoggedIn from "./hooks";
import Drawer from "@mui/material/Drawer";
import {
    toggleOpenForgotPassword,
    toggleOpenLogin,
    toggleOpenRegister,
    toggleOpenResetPassword
} from "../lib/reducers/appSlicer";
import Box from "@mui/material/Box";
import Signin from "../app/account/signin/page";
import Signup from "../app/account/signup/page";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import {getAllFilters} from "../app/blog/components/CustomFilter";
import {getAFilters} from "../lib/reducers/filtersSlicer";
import ForgotPassword from "../app/account/forgot-password/page";
import ResetPassword from "../app/account/resetpassword/page";
import Head from "next/head";

function MyApp() {
    const {enqueueSnackbar} = useSnackbar();

    const handleClickVariant = (variant: VariantType) => () => {
        // variant could be success, error, warning, info, or default
    };

    return (
        <Button
            onClick={() =>
                enqueueSnackbar("This is a success message!", {variant: "success"})
            }
        >
            Show success snackbar
        </Button>
    );
}

const DrawerList = (
    <Box sx={{width: 360}}
         role="presentation"


    >

        oijijojoijo
    </Box>
);

export default function MyTheme(props: { children: React.ReactNode }) {
    const {loggedAccount} = useCheckLoggedIn(
        (data: any) => {
            // showInformation("Hello " + data?.firstname);
        },
        (err: any) => {
        }
    );
    React.useEffect(() => {

        async function retriveFilters() {

            await getAllFilters()
                .then((data) => {
                    dispatch(getAFilters({data: data}));

                })
                .catch((err) => {
                    return err;
                });
        }

        retriveFilters();
    }, []);

    const isDarkMode = useSelector(
        (state: RootState) => state.darkMode.isDarkMode
    );
    // const { showWarningMsg } = useWarningMsg();
    const dispatch = useDispatch();
    const {isWarningOpen, message, type} = useSelector(
        (state: RootState) => state.warningMsg
    );
    const openLogin = useSelector((state: RootState) => state.appSettings).openLogin;
    const openRegister = useSelector((state: RootState) => state.appSettings).openRegister;
    const openForgot = useSelector((state: RootState) => state.appSettings).openForgotPassword;
    const openReset = useSelector((state: RootState) => state.appSettings).openResetPassword;

    const LPtheme = createTheme(getLPTheme(isDarkMode ? "dark" : "light"));

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(hideWarning());
    };

    const {enqueueSnackbar} = useSnackbar();

    return (
        <ThemeProvider theme={LPtheme}>

            <Head>

                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon"
                      type="image/png" sizes="60x60" href="/images/icons/favicon.png"/>
                <title> Develop With X</title>
                <meta name="description" content=" "/>
                <meta name="robots" content="index, follow"/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Your Website Title</title>

                <meta name="environment" content="production"/>
                <meta name="description"
                      content="Discover insightful software programming tutorials, tips, and solutions on my personal blog. Whether you're a beginner or an experienced developer, find practical advice, in-depth guides, and problem-solving techniques to enhance your coding skills and advance your projects. Join our community and stay updated with the latest trends and best practices in the world of software development."/>


                <meta property="og:title" content="Your Website Title"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://devwithx.com/"/>
                <meta property="og:image" content="https://devwithx.com/images/img/presentation3.png"/>
                <meta property="og:description"
                      content="Discover insightful software programming tutorials, tips, and solutions on my personal blog. Whether you're a beginner or an experienced developer, find practical advice, in-depth guides, and problem-solving techniques to enhance your coding skills and advance your projects. Join our community and stay updated with the latest trends and best practices in the world of software development."/>
                <meta property="og:site_name" content="Develop with X"/>
                <meta property="og:locale" content="en_US"/>


                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="Develop with X"/>
                <meta name="twitter:description"
                      content="Discover insightful software programming tutorials, tips, and solutions on my personal blog. Whether you're a beginner or an experienced developer, find practical advice, in-depth guides, and problem-solving techniques to enhance your coding skills and advance your projects. Join our community and stay updated with the latest trends and best practices in the world of software development."/>
                <meta name="twitter:image" content="https://devwithx.com/images/img/presentation3.png"/>
                <meta name="twitter:site" content="@yourtwitterhandle"/>
                <meta name="twitter:creator" content="@yourtwitterhandle"/>


            </Head>

            <SnackbarProvider maxSnack={3}>
                <>
                    <div>{props.children} </div>

                    <Drawer open={openLogin || openRegister || openReset || openForgot}
                            anchor="right"
                            sx={{zIndex: 13000}}
                    >
                        <IconButton style={{position: "absolute", right: "10px", top: "10px"}} onClick={() => {
                            if (openLogin) dispatch(toggleOpenLogin())
                            if (openRegister) dispatch(toggleOpenRegister())
                            if (openReset) dispatch(toggleOpenResetPassword())
                            if (openForgot) dispatch(toggleOpenForgotPassword())


                        }}><Close/></IconButton>
                        <Box width={"600px"} sx={{backgroundColor: "background.paper"}}>
                            {openLogin && <Signin/>}
                            {openRegister && <Signup/>}
                            {openForgot && <ForgotPassword/>}
                            {openReset && <ResetPassword/>}
                        </Box>

                    </Drawer>
                </>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
