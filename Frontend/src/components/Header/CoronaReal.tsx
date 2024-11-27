import React from "react"

// Styles
import styles from "../../css/jscss/root"

import { Box } from "@mui/material"

export default function () {
    return (
        <React.Fragment>
            <ContainerPrimary />
        </React.Fragment>
    )
}

/** BODY */
const ContainerPrimary = () => {
    return (
        <Box sx={styles.containerLogo}>
            <img src="/Logo.png" alt="logo"/>
        </Box>
    )
}