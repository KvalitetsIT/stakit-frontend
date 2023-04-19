import { Box, Container, CssBaseline, Toolbar, Typography, useTheme } from '@mui/material';
import React from 'react';
import { theme } from '../../config/theme';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';
import { Topbar } from './Topbar';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { Logo } from '../icons/logo';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useKeycloak } from '@react-keycloak/web';
import { Stack } from '@mui/system';
import { t } from 'i18next';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
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
          logo={<><Title color={theme.palette.primary.contrastText} /></>}
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
            <SidebarItem title={t("Dashboard")} icon={<SwapVertIcon />} href={"/"} />
            {/* <SidebarItem title='Login' icon={<LoginIcon />} href={"/login"} />
            <SidebarItem title='Register' icon={<LogoutIcon />} href={"/register"} /> */}
            <SidebarItem title={t('Subscribe')} icon={<NotificationsActiveIcon />} href={"/subscribe"} />
          </SidebarSection>
          <SidebarSection hideDivider>
            <SidebarItem title={t("Subscriptions")} icon={<ScheduleSendIcon />} href={"/subscriptions"} />
            <SidebarItem title={t("Services")} icon={<MiscellaneousServicesIcon />} href={"/services"} />
            <SidebarItem title={t("Groups")} icon={<WorkspacesIcon />} href={"/groups"} />
            <SidebarItem title={t("Announcements")} icon={<AnnouncementIcon />} href={"/announcements"} />
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

    <Stack direction={"row"}>

    <Typography
        
        noWrap
        component="a"
        sx={{
          //mr: 2,
          display: { xs: 'flex', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          //letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          fontSize: 40

        }}
      >
        <span style={{ color: props.color ?? theme.palette.primary.main }}>STA</span><Logo />
      </Typography>
    </Stack>
  
  )
}

