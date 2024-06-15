// src/components/FeatureBox.js
import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {animated, useSpring} from 'react-spring';
import ListItem from "@mui/material/ListItem";

const features = [
    {
        title:
            "What", text:

            "What is the project about? What problem does it aim to solve? Here, I’ll outline the goals and objectives of each service."
    },
    {
        title: "Why",
        text: "Why was this project created? Why were specific technologies and methods chosen? Understanding the reasoning behind the choices made is crucial for appreciating the project's value and uniqueness."
    },

    {
        title: "How",
        text: "How was the project developed? This is where the magic happens. I’ll walk you through the step-by-step process, highlighting the technologies used and the challenges overcome."
    },

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
        <Box sx={{flexGrow: 1, padding: 4}}>
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={12}>
                    <animated.div style={props}>
                        <Typography variant={"h1"}
                                    sx={{marginTop: '-10px', fontSize: {xs: "20px", sm: "26px", md: "32px"}}}
                                    gutterBottom>
                            Welcome to DevWithX!
                        </Typography>
                        <Typography variant={"body2"}
                                    sx={{width: "69%", fontSize: {xs: "13px", sm: "20px", md: "20px"}}}>
                            Hi there! Welcome to DevWithX – your go-to resource for learning how to develop a wide range
                            of services using diverse technologies. I'm passionate about sharing the stories behind each
                            project, from the initial concept to the final product. Each post is a journey through the
                            What, Why, and How of development.</Typography>
                        <br/>

                    </animated.div>
                    <Grid p={3} sx={{display:{xs:"none",sm:"flex"}}}>
                        <animated.div style={props2}>
                            <Typography variant="h5" gutterBottom>
                                More ?
                            </Typography>
                            {features.map((feature, index) => (
                                <ListItem key={index} sx={{
                                    display: "flex",
                                    alignItems: "start",
                                    width: "68%",
                                    backgroundColor: '#22a1',
                                    columnGap: "10px",
                                    marginBlock: "5px",
                                    paddingBlock: "8px",
                                    borderRadius:"9px"
                                }}>
                                    <Typography fontStyle={"italic"} fontWeight={700}>{feature?.title}: </Typography> <Typography
                                    sx={{color: 'text.primary'}} gutterBottom>
                                    {feature.text}
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
