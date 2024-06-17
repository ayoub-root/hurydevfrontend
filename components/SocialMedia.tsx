import {GitHub, LinkedIn, StackedLineChartOutlined, Twitter,} from "@mui/icons-material";
import {Icon, IconButton, Stack} from "@mui/material";
import Image from "next/image";

export function SocialMedia() {
    return (
        <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
                color: "text.secondary",
            }}
        >
            <IconButton  target={"_blank"}
                color="inherit"
                href="https://github.com/ayoub-root"
                aria-label="GitHub"
                sx={{alignSelf: "center"}}
            >
                <GitHub/>
            </IconButton>
            <IconButton  target={"_blank"}
                color="inherit"
                href="https://www.linkedin.com/in/ayoub-benayache/"
                aria-label="Stackoverflow"
                sx={{alignSelf: "center"}}
            >
                <LinkedIn/>
            </IconButton>
            <IconButton
                color="inherit"  target={"_blank"}
                href="https://twitter.com/benayache_ayoub"
                aria-label="X"
                sx={{alignSelf: "center"}}
            >
                <Twitter/>
            </IconButton>
            <IconButton
                color="inherit"
                target={"_blank"}
                href="https://stackoverflow.com/users/8436879/ayoub-benayache"
                aria-label="LinkedIn"
                sx={{alignSelf: "center"}}
            >
                <img alt={""} width='20px' height={"20px"} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png?20190716190036"}/>
            </IconButton>
            <IconButton
                color="inherit"
                target={"_blank"}
                href="https://leetcode.com/u/ayoubbendev/"
                aria-label="LinkedIn"
                sx={{alignSelf: "center"}}
            >
                <Image alt={""} width={20} height={20} src={"/images/icons/leetcode.png"}/>
            </IconButton>
        </Stack>
    );
}
