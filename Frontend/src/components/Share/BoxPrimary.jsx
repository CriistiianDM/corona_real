import React from "react"

// Styles
import styles from "../../css/jscss/root"

import { Box, Grid2 } from "@mui/material"

export default function ({ title, children }) {
    return (
        <React.Fragment>
            <ContainerPrimary title={title}>
                {children}
            </ContainerPrimary>
        </React.Fragment>
    )
}

/** BODY */
const ContainerPrimary = ({ title, children }) => {
    console.log(title)
    return (
    <Box sx={styles.boxContainerPrimary}>
        <Grid2 className="title-box">{title}</Grid2>
        {children}
    </Box>
    )
}