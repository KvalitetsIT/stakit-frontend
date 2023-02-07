import { Box, Container, CssBaseline, Toolbar, Typography, useTheme } from '@mui/material';
import { Role, User } from '../../models/User';
import React from 'react';
import { theme } from '../../config/theme';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';
import { Topbar } from './Topbar';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { Logo } from '../icons/logo';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useKeycloak } from '@react-keycloak/web';
type LayoutProps = {
  children: JSX.Element
}


export default function Layout(props: LayoutProps) {


  const sidebarWidth = 250
  const theme = useTheme()

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const keycloak = useKeycloak()

  const disableSidebar = !keycloak.initialized || !keycloak.keycloak.authenticated

  return (

    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Topbar
          sidebarDisabled={disableSidebar}
          width={sidebarWidth}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}></Topbar>
        <Sidebar
          disabled={disableSidebar}
          width={sidebarWidth}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          logo={<Title color={theme.palette.primary.contrastText} />}>
          <SidebarSection hideDivider title={"Public"}>
            <SidebarItem title="Dashboard" icon={<SwapVertIcon />} href={"/"} />
            {/* <SidebarItem title='Login' icon={<LoginIcon />} href={"/login"} />
            <SidebarItem title='Register' icon={<LogoutIcon />} href={"/register"} /> */}
            <SidebarItem title='Subcribe' icon={<NotificationsActiveIcon />} href={"/subscribe"} />
          </SidebarSection>
          <SidebarSection title={"Authorized"}>
            <SidebarItem title="Services" icon={<MiscellaneousServicesIcon />} href={"/services"} />
            <SidebarItem title="Groups" icon={<WorkspacesIcon />} href={"/groups"} />
            <SidebarItem title="Announcements" icon={<AnnouncementIcon />} href={"/announcements"} />
          </SidebarSection>
        </Sidebar>
        <Container maxWidth={false} sx={{ backgroundColor: theme.palette.background.default, flexGrow: 1, p: 2, width: { md: `calc(100% - ${sidebarWidth}px)` } }}>
          <Toolbar />
          {props.children}
        </Container>
        n
      </Box>
    </>
  )
}


function Title(props: { color?: string }) {
  return (
    <Typography
      variant="h4"
      noWrap
      component="a"
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',

      }}
    >
      <span style={{ color: props.color ?? theme.palette.primary.main }}>Sta</span><Logo />
    </Typography>
  )
}

