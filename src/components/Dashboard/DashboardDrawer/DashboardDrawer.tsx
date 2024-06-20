"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import user from "../../../../src/assets/images/user.jpg";
import SideBar from "../SideBar/SideBar";
import { ArrowDownward, NotificationsNone } from "@mui/icons-material";
import "./DashboardDrawer.css";
const settings = ["Profile", "Settings", "Hotel", "Content", "Log Out"];

const drawerWidth = 240;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [hover, setHover] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    setHover(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setHover(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setHover(true);
    setAnchorElUser(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#0891b2",
          color: "#fff",
          boxShadow: 0,
          borderBottom: "1px solid #ddd",
          py: 1,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none", color: "#fff" } }}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: { md: "none", sm: "block" } }}></Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{ color: "#fff" }}
              >
                Hi, Ibrahim Sikder,
              </Typography>
              <Typography variant="h6" noWrap component="h4" fontWeight="bold">
                Welcome to Indiano Travel!
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                borderTop: "",
                padding: "0px 0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                justifyItems:'end'
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <Badge color="secondary" badgeContent={5} showZero>
                  <NotificationsNone
                    sx={{ color: "#fff", fontSize: "30px", marginRight: "5px" }}
                  />
                </Badge>
                <Box component="div" className="hoverMenuList">
                  <Image
                    src={user}
                    width="30"
                    alt="user"
                    height="30"
                    className="rounded-full "
                  />
                  <Box component="div" className="menuList">
                    <Stack
                      gap={2}
                      direction="column"
                      sx={{
                        position: "absolute",
                        top: "30px",
                        width: "150px",
                        padding: "10px 0",
                        right: "0px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        zIndex: 999,
                        background: "#fff",
                        textAlign: "center",
                        border: "1px solid #d",
                      }}
                    >
                      <Typography sx={{ borderBottom: "1px solid #ddd" }}>
                        Profile
                      </Typography>
                      <Typography sx={{ borderBottom: "1px solid #ddd" }}>
                        Settings
                      </Typography>
                      <Typography sx={{ borderBottom: "1px solid #ddd" }}>
                        Account
                      </Typography>
                      <Typography sx={{ borderBottom: "1px solid #ddd" }}>
                        Support
                      </Typography>
                      <Typography>Log Out</Typography>
                    </Stack>
                  </Box>
                </Box>
                <ArrowDownward sx={{ color: "#fff", fontSize: "30px" }} />
              </Stack>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
