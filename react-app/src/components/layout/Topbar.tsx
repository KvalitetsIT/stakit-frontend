import { AppBar, Toolbar, IconButton, Typography, Box, Chip } from "@mui/material";
import { useContext } from "react";
import { theme } from "../../config/theme";
import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import keycloak from "../../feature/authentication/Keycloak";
import { LoginOutlined } from "@mui/icons-material";
import { Can } from "../../feature/authentication/logic/Can";
import { Asset, Operation } from "../../feature/authentication/config/ability";

interface TopbarProps { width: number | string, logo?: JSX.Element, mobileOpen?: boolean, setMobileOpen?: (open: boolean) => void, sidebarDisabled?: boolean }
export function Topbar(props: TopbarProps) {

    const { width, setMobileOpen, mobileOpen, sidebarDisabled } = props

    const handleDrawerToggle = () => setMobileOpen ? setMobileOpen(!mobileOpen ?? false) : {};


    const user = useContext(UserContext)


    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: { sm: theme.palette.primary.main, md: sidebarDisabled ? theme.palette.primary.main : theme.palette.background.default },
                width: { md: sidebarDisabled ? `100%` : `calc(100% - ${width}px)` },
                ml: { sm: `${width}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: sidebarDisabled ? 'none' : { md: 'none' } }}
                >

                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: sidebarDisabled ? 'flex' : 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    
                    {props.logo}
                  
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.PRIVATE}>
                        <IconButton sx={{ p: 0 }}>
                            <Chip color="secondary" icon={<TagFacesIcon />} /* avatar={<Avatar>{user?.firstName?.charAt(0)}</Avatar>} */ label={user?.firstName} />
                        </IconButton>
                    </Can>
                    <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.PUBLIC}>
                        <IconButton sx={{ p: 0 }} onClick={() => keycloak.login({})}>
                            <Chip clickable color="secondary" icon={<LoginOutlined />} /* avatar={<Avatar>{user?.firstName?.charAt(0)}</Avatar>} */ label={"Login"} />
                        </IconButton>
                    </Can>
                </Box>

            </Toolbar>
        </AppBar>
    )

}
