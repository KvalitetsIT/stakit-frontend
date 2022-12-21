import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Drawer, Toolbar } from "@mui/material"
import { ReactNode, ReactElement } from "react"
import { Link } from "react-router-dom"
import { theme } from "../../theme"

export function SidebarSection(props: { hideDivider?: boolean, title?: string | ReactNode, children: ReactElement<typeof SidebarItem> | ReactElement<typeof SidebarItem>[] }) {
    return (
        <>
            {props.hideDivider ? <></> : <Divider textAlign={"left"} flexItem={true} color={theme.palette.primary.contrastText}>{props.title}</Divider>}
            <List>
                {props.children}
            </List>
        </>
    )
}

export function SidebarItem(props: { title: string, icon: ReactNode, href: string, active?: boolean }) {
    return (
        <Link to={props.href} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem key={props.title} disablePadding>
                <ListItemButton selected={props.active} >
                    <ListItemIcon sx={{ color: "inherit" }}>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.title} />
                </ListItemButton>
            </ListItem>
        </Link>
    )
}

interface ResponsiveDrawerProps {
    children?: ReactElement<typeof SidebarSection> | ReactElement<typeof SidebarSection>[]
    logo?: ReactNode
    width?: number | string
    mobileOpen?: boolean
    setMobileOpen?: (open: boolean) => void
}

export function Sidebar(props: ResponsiveDrawerProps) {

    const width = props.width ?? 300

    const { mobileOpen, setMobileOpen } = props

    const drawerContent = (
        <div>
            {props.children}
        </div>
    );

    const handleDrawerToggle = () => setMobileOpen ? setMobileOpen(!mobileOpen ?? false) : {};

    return (

        <Box
            component="nav"
            sx={{ width: { md: width }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >

            {/* The mobile view */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' }
                }}
                PaperProps={{ sx: { color: 'primary.contrastText', background: theme.palette.primary.main, boxSizing: 'border-box', width: width } }}
            >
                <Toolbar />
                {drawerContent}
            </Drawer>
            {/* The desktop view */}
            <Drawer
                variant="permanent"

                sx={{
                    display: { xs: 'none', md: 'block' }
                }}
                PaperProps={{ sx: { color: 'primary.contrastText', background: theme.palette.primary.main, boxSizing: 'border-box', width: width } }}
                open
            >
                <Toolbar><Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>{props.logo}</Link></Toolbar>
                {drawerContent}
            </Drawer>
        </Box>
        //  "theme.palette.primary.contrastText"
    );
}