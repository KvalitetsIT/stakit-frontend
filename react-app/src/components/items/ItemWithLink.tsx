import { ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";


export function ItemWithLink(props: { to: string; disabled?: boolean; children: JSX.Element; }) {

    if (props.disabled)
        return <>{props.children}</>;
    return (
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={props.to}>
            <ListItemButton dense disableGutters disableRipple>

                {props.children}

            </ListItemButton>
        </Link>
    );
}
