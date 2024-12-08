import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddressSearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Drawer,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import type { NextRouter } from "next/router";
import React from "react";
import AddSimpleRestroomContainer from "@/containers/AddSimpleRestroomContainer";
import { User } from "@/interface/userInterface";

interface HeaderProps {
  router: NextRouter;
  user: User | null;
  isOpen: boolean;
  openDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  openAddSimpleRestroomModal: boolean;
  setOpenAddSimpleRestroomModal: React.Dispatch<React.SetStateAction<boolean>>;
  sideBar: () => JSX.Element;
}

const Header: React.FC<HeaderProps> = ({
  router,
  user,
  isOpen,
  openDrawer,
  openAddSimpleRestroomModal,
  setOpenAddSimpleRestroomModal,
  sideBar,
}) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        py: "12px",
      }}
    >
      <Container maxWidth="xl" sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={openDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
              {/* サイドバー以外をクリックしても閉じるようにする */}
              <Drawer anchor="left" open={isOpen} onClose={openDrawer(false)}>
                {sideBar()}
              </Drawer>
            </Box>
            <Box>
              <Link href="/">
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: {
                      xs: "120px",
                      sm: "140px",
                      md: "160px",
                      lg: "180px",
                      xl: "200px",
                    },
                    height: "auto",
                    "& img": {
                      width: "100%",
                      height: "auto",
                    },
                  }}
                >
                  <Image
                    src="/headerlogo.png"
                    alt="logo"
                    width={200}
                    height={50}
                    prefix="false"
                    priority
                  />
                </Box>
              </Link>
            </Box>
            <Box>{user && <Box sx={{ ml: 10 }}>ログイン中 </Box>}</Box>
          </Box>
          <Box>
            <Toolbar>
              <IconButton
                edee="start"
                color="inherit"
                aria-label="menu"
                onClick={() => console.log("display search button")}
              >
                <AddressSearchIcon
                  style={{
                    cursor: "pointer",
                    stroke: "none",
                    fontSize: "35px",
                  }}
                />
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  if (user?.id) {
                    setOpenAddSimpleRestroomModal(true);
                  } else {
                    router.push("/sign_in");
                  }
                }}
              >
                <AddLocationIcon
                  style={{
                    cursor: "pointer",
                    stroke: "none",
                    fontSize: "35px",
                  }}
                />
              </IconButton>
            </Toolbar>
            <AddSimpleRestroomContainer
              open={openAddSimpleRestroomModal}
              onClose={() => setOpenAddSimpleRestroomModal(false)}
            />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
