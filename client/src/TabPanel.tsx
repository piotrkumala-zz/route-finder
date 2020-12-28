import {Box} from "@material-ui/core";
import React from "react";

export const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={10}>
                    {children}
                </Box>
            )}
        </div>
    );
}