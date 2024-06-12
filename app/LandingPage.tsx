import * as React from "react";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AppAppBar from "../components/AppAppBar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

import ContactUs from "components/ContactUs";

import MyServices from "components/MyServices";
import ServiceFeatures from "../components/ServiceFeatures";
import Hero from "../components/Hero";

export default function LandingPage() {
    return (
        <div>
            <AppAppBar/>

             <Hero />
            <Box id="home" sx={{bgcolor: "background.default"}}>
                {/* <LogoCollection /> */}
                <MyServices/>
                <Divider/>
                <ServiceFeatures/>
                <Divider/>

                {/* <Pricing />
        <Divider /> */}
                <FAQ/>
                <Divider/>
                <Grid container sx={{justifyContent: "center"}}>
                    <Grid item xs={12} sm={12} md={6} lg={6}

                          xl={6}
                    >

                        <ContactUs/>
                    </Grid>
                </Grid>
                <Divider/>
                <Footer/>
            </Box>
        </div>
    );
}
