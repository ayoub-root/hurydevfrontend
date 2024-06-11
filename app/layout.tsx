"use client";
import "./style.scss";
import 'react-toastify/dist/ReactToastify.css';
import * as React from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

import {store} from "../lib/store";
import {Provider} from "react-redux";
import MyTheme from "components/MyTheme";
import {closeSnackbar, SnackbarProvider} from "notistack";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import NotificationListener from "../components/NotificationListener";
import Chatbot from "../components/ChatBot";


const Action = (snackbarId: any) => (
    <>
        <IconButton
            onClick={() => {
                closeSnackbar(snackbarId);
            }}
        >
            <Close fontSize="small"/>
        </IconButton>
    </>
);


export default function RootLayout(props: { children: React.ReactNode }) {
    const myRef = React.useRef(null);

    return (
        <html lang="en">
        <head>
            <title> Hury developement</title>
            <meta name="description" content=" "/>
            <meta name="robots" content="index, follow"/>

        </head>


        <body style={{fontFamily: "verdana !important"}}>
        <Provider store={store}>
            <MyTheme>
                <SnackbarProvider maxSnack={3} ref={myRef} action={Action}>
                    <AppRouterCacheProvider options={{enableCssLayer: true}}>
                        <CssBaseline/>
                        {props.children}
                        <NotificationListener/>
                        <Chatbot/>
                    </AppRouterCacheProvider>
                </SnackbarProvider>

            </MyTheme>
        </Provider>

        </body>
        </html>
    );
}
