import { AppBar, Toolbar, IconButton, Typography, Box, Chip, Avatar, ListItemIcon, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { theme } from "../../config/theme";
import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import keycloak from "../../feature/authentication/Keycloak";
import { LoginOutlined, Logout } from "@mui/icons-material";
import { Can } from "../../feature/authentication/logic/Can";
import { Asset, Operation } from "../../feature/authentication/config/ability";
import Menu from '@mui/material/Menu';
import getEnvironment from "../../config/env";

interface TopbarProps { width: number | string, logo?: JSX.Element, mobileOpen?: boolean, setMobileOpen?: (open: boolean) => void, sidebarDisabled?: boolean }
export function Topbar(props: TopbarProps) {

  const { width, setMobileOpen, mobileOpen, sidebarDisabled } = props

  const handleDrawerToggle = () => setMobileOpen ? setMobileOpen(!mobileOpen ?? false) : {};


  const user = useContext(UserContext)




  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const env = getEnvironment()

  const additional_links: { link: string, title: string }[] = env.REACT_APP_LINKS.map((link, i) => ({ link: link, title: env.REACT_APP_LINKS_TITLES[i] }))
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
            <IconButton sx={{ p: 0 }} onClick={handleClick}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>{user?.firstName?.charAt(0)}</Avatar>
            </IconButton>
          </Can>
          <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.PUBLIC}>
            <IconButton sx={{ p: 0 }} onClick={() => keycloak.login({})}>
              <Chip clickable color="secondary" icon={<LoginOutlined />} label={"Login"} />
            </IconButton>
          </Can>

          {

            additional_links.map((link, i) => {
              return (
                <IconButton sx={{ padding: 0, marginLeft: 2 }}
                  component="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.link}>
                  <Chip clickable color={keycloak.authenticated ? "default" : "primary"} sx={{ border: 1, borderColor: theme.palette.secondary.main }} label={<Typography color="secondary">{link.title}</Typography>} />
                </IconButton>
              )
            })

          }
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/*
                    <MenuItem onClick={() => console.log("Do something!")}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Do something!")}>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => console.log("Do something!")}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Do something!")}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                */}
          <MenuItem onClick={() => keycloak.logout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>


      </Toolbar>
    </AppBar>
  )

}



