import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Stack, Divider, Chip, Box, IconButton, Avatar, Icon, Tooltip, AccordionActions } from "@mui/material";
import { Service, Status } from "../../models/types";
import { Modes, ServiceItem } from "../service";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Group } from "../../models/group";
import { Edit, QuestionMarkOutlined } from "@mui/icons-material";
import { server } from "typescript";
import { useGetAllServicesQuery, useGetServiceQuery } from "../../feature/stakit/serviceSlice";
import { StatusAvatar, StatusIcon, useGetColorByStatus, useGetColorTagByStatus } from "../status";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Can } from "../../feature/authentication/logic/Can";
import { Operation } from "../../feature/authentication/config/ability";
import { group } from "console";
import { Serializable } from "child_process";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export function GroupAccordion(props: { defaultExpanded?: boolean, group?: Group, key?: string }) {


    let services: Service[] = props.group?.services ? props.group?.services as Service[] : []
    
    const serviceWhichAreOk: number = services.filter((service: Service) => service.status === Status.OK).length

    const getStatusOfGroup = () => {
        return services.length == 0 ? Status.UKNOWN : services.every((service: Service) => service.status === Status.OK) ? Status.OK : Status.NOT_OK
    }

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
                        <Typography variant="h6">{props.group?.name}</Typography>
                        <Typography>{props.group?.description}</Typography>
                    </Stack>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Chip
                            avatar={<Icon sx={{"": {color: "warning"}}}><StatusIcon variant="outlined" status={getStatusOfGroup()} /></Icon>}
                            color={useGetColorTagByStatus(getStatusOfGroup())}
                            label={<Typography color={"white"}>{serviceWhichAreOk} / {services.length}</Typography>}

                        />
                    </Box>
                </Stack>
                <AccordionActions>
                    <Can ability={user.getAbility()} I={Operation.MANAGE} a="resource">
                        <Tooltip title={"Edit"}>
                            <Link to={"/groups/" + props.group?.uuid} state={{ mode: Modes.EDIT }} >
                                <IconButton edge="end" aria-label="Edit" sx={{ marginRight: 1, marginLeft: 2 }}/* onClick={(e) => { setMode(Modes.EDIT) }} */>
                                    <Edit />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Can>
                </AccordionActions>

            </AccordionSummary>

            {
                services.length > 0 && (
                    <>
                        <Divider />
                        <AccordionDetails sx={{ padding: 0 }}>
                            <List>
                                {services.map(service => (
                                    <ServiceItem
                                        service={service}
                                    ></ServiceItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </>
                )
            }
        </Accordion>


    )
}

