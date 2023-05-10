import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Stack, Divider, Chip, Box, IconButton, Icon, Tooltip, AccordionActions, Avatar } from "@mui/material";
import { Service, Status } from "../../models/types";
import { Modes, ServiceItem } from "../items/service";
import { Subscription } from "../../models/types";
import { Edit } from "@mui/icons-material";
import { StatusIcon, useGetColorTagByStatus } from "../status";
import { Link } from "react-router-dom";
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import { useContext } from "react";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Can } from "../../feature/authentication/logic/Can";
import { Operation } from "../../feature/authentication/config/ability";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { t } from "i18next";
import { group } from "console";
import { GroupItem, SubscriptionItem } from "../cards/Subscription";
import { Group } from "../../models/group";
import SearchIcon from '@mui/icons-material/Search';

export function SubscriptionAccordion(props: { defaultExpanded?: boolean, subscription?: Subscription, key?: string }) {


    const user = useContext(UserContext)!

    return (

        <Accordion
            disableGutters
            defaultExpanded={props.defaultExpanded}
            sx={{
                marginTop: 2,
                borderRadius: 1,
                "&.MuiAccordion-root:before": { backgroundColor: "rgba(0,0,0,0)" }
            }}
            

        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Stack direction={"row"} justifyContent="space-between" alignItems="stretch" width={"100%"}>
                     
                <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                    <Typography variant="h6">{props.subscription?.email}</Typography>
                    
                       
                    </Box>
                        
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Chip
                            avatar={<Icon sx={{"": {color: "warning"}}}><WorkspacesIcon /></Icon>}
                            label={<Typography color={"inherit"}>{props.subscription?.groups?.length}</Typography>}
                        />
                    </Box>
                </Stack>
                <AccordionActions>
                    <Can ability={user.getAbility()} I={Operation.MANAGE} a="resource">
                        <Tooltip title={<>{t("Details")}</>}>
                            <Link to={"/subscriptions/" + props.subscription?.uuid} >
                                <IconButton edge="end" sx={{ marginRight: 1, marginLeft: 2 }}/* onClick={(e) => { setMode(Modes.EDIT) }} */>
                                    <SearchIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Can>
                </AccordionActions>

            </AccordionSummary>

            {
                props.subscription?.groups && props.subscription.groups.length > 0 && (
                    <>
                        <Divider />
                        <AccordionDetails sx={{ padding: 0 }}>
                            <List>
                                {
                                    props.subscription.groups.map(group => group as Group).map(group => (<GroupItem group={group} />))
                                }
                            </List>
                        </AccordionDetails>
                    </>
                )
            }
        </Accordion>


    )
}

