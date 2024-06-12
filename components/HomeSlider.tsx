// src/components/FeatureBox.js
import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {animated, useSpring} from 'react-spring';
import ListItem from "@mui/material/ListItem";

const features = [
    'Learn JavaScript',
    'Understand React',
    'Master Next.js',
    'Explore Node.js',
];

const HomeSlider = () => {
    const props = useSpring({
        from: {opacity: 0, transform: 'translate3d(-100%,0,0)'},
        to: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        config: {duration: 700},
    });
    const props2 = useSpring({
        from: {opacity: 0, transform: 'translate3d(-100%,0,0)'},
        to: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        config: {duration: 500},
        delay:700,


    });

    return (
        <Box sx={{flexGrow: 1, padding: 3}}>
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={12}>
                    <animated.div style={props}>
                        <Typography variant={"h1"} sx={{marginTop:'-12px',fontSize: {xs: "20px", sm: "26px", md: "32px"}}} gutterBottom>
                            Why you are reading this?
                        </Typography>
                        <Typography sx={{width: "68%", fontSize: {xs: "13px", sm: "20px", md: "20px"}}}> Explore our
                            comprehensive range of services designed to meet your diverse needs. From UI/UX design to web development, cybersecurity, and beyond, we offer expertise across
                            the full spectrum of software solutions. Partner with us for reliable, top-quality services
                            tailored to your requirements.</Typography>
                        <br/>

                    </animated.div>
                    <Grid p={3} sx={{display:{xs:"none",sm:"flex"}}}>
                        <animated.div style={props2}>
                            <Typography variant="h3" gutterBottom>
                                Features
                            </Typography>
                            {features.map((feature, index) => (
                               <ListItem key={index}> <Typography  variant="body1" gutterBottom>
                                   <li>{feature}</li>
                               </Typography></ListItem>
                            ))}
                        </animated.div>
                    </Grid>

                </Grid>

            </Grid>
        </Box>
    );
};

export default HomeSlider;
