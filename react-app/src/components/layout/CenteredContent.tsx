import { Grid } from "@mui/material";
import React from "react";

export function CenteredContent(props: React.PropsWithChildren) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}
        >
            <Grid item>
                {props.children}
            </Grid>

        </Grid>
    )

}