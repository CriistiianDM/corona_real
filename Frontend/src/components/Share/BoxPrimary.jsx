import React from "react"

// Styles
import styles from "../../css/jscss/root"

import { Box } from "@mui/material"

export default function ({ children }) {
    return (
        <React.Fragment>
            <ContainerPrimary>
                {children}
            </ContainerPrimary>
        </React.Fragment>
    )
}

/** BODY */
const ContainerPrimary = ({ children }) => {
    return (
    <Box sx={styles.boxContainerPrimary}>{children}</Box>
    )
}