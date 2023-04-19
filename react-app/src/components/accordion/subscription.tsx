import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Stack, Divider, Chip, Box, IconButton, Icon, Tooltip, AccordionActions } from "@mui/material";
import { Service, Status } from "../../models/types";
import { Modes, ServiceItem } from "../service";
import { Subscription } from "../../models/types";
import { Edit } from "@mui/icons-material";
import { StatusIcon, useGetColorTagByStatus } from "../status";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Can } from "../../feature/authentication/logic/Can";
import { Operation } from "../../feature/authentication/config/ability";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { t } from "i18next";
import { group } from "console";
import { GroupItem, SubscriptionItem } from "../cards/Subscription";
import { Group } from "../../models/group";


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
                    <Stack>
                        <Typography variant="h6">{props.subscription?.email}</Typography>
                        <Typography>{props.subscription?.uuid}</Typography>
                    </Stack>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Chip
                            avatar={<Icon sx={{ color: "warning"}}><StatusIcon variant="outlined" /></Icon>}
                            label={<Typography color={"white"}>{props.subscription?.groups?.length}</Typography>}
                        />
                    </Box>
                </Stack>
                <AccordionActions>
                    <Can ability={user.getAbility()} I={Operation.MANAGE} a="resource">
                        <Tooltip title={<>{t("Edit")}</>}>
                            <Link to={"/subscriptions/" + props.subscription?.uuid} state={{ mode: Modes.EDIT }} >
                                <IconButton edge="end" sx={{ marginRight: 1, marginLeft: 2 }}/* onClick={(e) => { setMode(Modes.EDIT) }} */>
                                    <Edit />
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

