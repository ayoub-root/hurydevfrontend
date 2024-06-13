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
import Chatbot from "../components/ChatBot";
import Head from "next/head";


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

            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon"
                  type="image/png" sizes="60x60" href="/images/icons/favicon.png"/>
            <title> Develop With X</title>
            <meta name="description" content=" "/>
            <meta name="robots" content="index, follow"/>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Your Website Title</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Develop With X</title>
            <meta name="description"
                  content="Discover insightful software programming tutorials, tips, and solutions on my personal blog."/>


            <meta property="og:title" content="Develop With X"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://devwithx.com"/>
            <meta property="og:image" content="https://devwithx.com/images/img/presentation3.png"/>
            <meta property="og:image:alt" content="About me"/>
            <meta property="og:description"
                  content="Discover insightful software programming tutorials, tips, and solutions on my personal blog."/>
            <meta property="og:site_name" content="Develop With X"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Develop With X"/>
            <meta name="twitter:description"
                  content="Discover insightful software programming tutorials, tips, and solutions on my personal blog."/>
            <meta name="twitter:image" content="https://devwithx.com/images/img/presentation3.png"/>
            <meta property="twitter:image:alt" content="About me"/>
            <meta name="twitter:site" content="@yourtwitterhandle"/>
            <meta name="twitter:creator" content="@yourtwitterhandle"/>
            <meta property="twitter:image:width" content="1200"/>
            <meta property="twitter:image:height" content="630"/>

        </head>


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
