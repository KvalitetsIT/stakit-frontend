import { Status } from "../models/types"
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
export function StatusIcon(props: {status?: Status}){
    switch(props.status) {
        case Status.UP: return <ArrowCircleUpOutlinedIcon color="success"></ArrowCircleUpOutlinedIcon>
        case Status.DOWN: return <ArrowCircleDownOutlinedIcon color="warning"></ArrowCircleDownOutlinedIcon>
        default: return <HelpOutlineOutlinedIcon color="secondary"></HelpOutlineOutlinedIcon>
    }
}
