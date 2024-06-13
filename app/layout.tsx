"use client";
import "./style.scss";
import 'react-toastify/dist/ReactToastify.css';
import * as React from "react";
import {useEffect, useState} from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

import {store} from "../lib/store";
import {Provider} from "react-redux";
import MyTheme from "components/MyTheme";
import {closeSnackbar, SnackbarProvider} from "notistack";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import Chatbot from "../components/ChatBot";
import CustomHeader from "../components/CustomHeader";


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
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        // Check pathname when component mounts and on route changes
        const currentPathname = window.location.pathname;

        // Example: Conditionally hide header if pathname includes '/blog'
        if (currentPathname.includes('/blog/posts')) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }   // Cleanup function
        return () => {
            // Optionally perform cleanup
        };
    }, []); // Empty dependency array ensures effect runs only once on mount

    return (
        <html lang="en">
        {showHeader && <CustomHeader/>}


        <body style={{fontFamily: "verdana !important"}}>
        <Provider store={store}>
        <MyTheme>
                <SnackbarProvider maxSnack={3} ref={myRef} action={Action}>
                    <AppRouterCacheProvider options={{enableCssLayer: true}}>
                        <CssBaseline/>
                        {props.children}
                        {//<NotificationListener/>
                        }
                        <Chatbot/>
                    </AppRouterCacheProvider>
                </SnackbarProvider>

            </MyTheme>
        </Provider>

        </body>
        </html>
    );
}
