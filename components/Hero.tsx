import * as React from "react";
import {alpha, Grid, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HomeSlider from "./HomeSlider";

export default function Hero() {
    return (
        <Box
            id="home"
            sx={(theme) => ({
                width: "100%",
                backgroundImage:
                    theme.palette.mode === "light"
                        ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                        : "linear-gradient(#02294F, #090E10)",
                backgroundSize: "100% 20%",
                backgroundRepeat: "no-repeat",

            })}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // pt: { xs: 14, sm: 20 },
                    //   pb: { xs: 8, sm: 12 },
                }}
            >

<Grid>

</Grid>

                <Box
                    id="image"
                    sx={(theme) => ({
                        mt: {xs: 8, sm: 14},
                        alignSelf: "center",
                        height: {xs: 200, sm: 600},
                        width: "100%",
                        backgroundImage: theme.palette.mode === "light"
                            ?  'url("/images/img/presnetation2.png")':
                            'url("/images/img/presnetation1.png")',
                            backgroundSize: "100% 100%",
                        borderRadius: "10px",
                        outline: "1px solid",
                        outlineColor:
                            theme.palette.mode === "light"
                                ? alpha("#BFCCD9", 0.5)
                                : alpha("#9CCCFC", 0.1),
                        boxShadow:
                            theme.palette.mode === "light"
                                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                    })}
                >

                  <HomeSlider/>
                </Box>
            </Container>
        </Box>
    );
}
