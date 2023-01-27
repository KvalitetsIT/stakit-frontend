import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Button } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import MenuIcon from '@mui/icons-material/Menu'
import { SubscibeButton } from "../../pages/dashboard/dashboard";
import { Logo } from "../icons/logo";

interface TopbarProps { width: number | string, logo?: ReactNode, mobileOpen?: boolean, setMobileOpen?: (open: boolean) => void }
export function Topbar(props: TopbarProps) {

    const { width, setMobileOpen, mobileOpen } = props

    const handleDrawerToggle = () => setMobileOpen ? setMobileOpen(!mobileOpen ?? false) : {};

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: { sm: theme.palette.primary.main, md: theme.palette.background.default },
                width: { md: `calc(100% - ${width}px)` },
                ml: { sm: `${width}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>



                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    align='center'
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <Link style={{ textDecoration: 'none', color: "inherit" }} to={"/"}>
                        Sta<Logo />
                    </Link>
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Link to={"/profile"} style={{ textDecoration: "none", color: "inherit" }}>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="J" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Link>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
