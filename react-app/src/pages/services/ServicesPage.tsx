import { Add, Refresh } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Collapse, Container, IconButton, List, Tooltip } from "@mui/material";
import { ServiceItem } from "../../components/service";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { ServiceForm } from "../../components/forms/service";
import { useCreateServiceMutation, useGetAllServicesQuery } from "../../feature/stakit/serviceSlice";
import { Service } from "../../models/types";
import { ServicesCard } from "../../components/cards/Services";

export function ServicesPage() {

    return (
        <Container>
            <ServicesCard/>
        </Container>

    )
}
