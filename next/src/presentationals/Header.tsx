import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Drawer,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface HeaderProps {
  isOpen: boolean
  openDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
  list: () => JSX.Element
}

const Header: React.FC<HeaderProps> = ({ isOpen, openDrawer, list }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
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
            <Drawer
              anchor="left"
              open={isOpen}
              onClose={() => {
                openDrawer(false)
              }}
            >
              {list()}
            </Drawer>
          </Box>
          <Box>
            <Link href="/">
              <Box
                sx={{
                  width: '100%',
                  maxWidth: {
                    xs: '120px',
                    sm: '140px',
                    md: '160px',
                    lg: '180px',
                    xl: '200px',
                  },
                  height: 'auto',
                  '& img': {
                    width: '100%',
                    height: 'auto',
                  },
                }}
              >
                <Image
                  src="/headerlogo.png"
                  alt="logo"
                  width={200}
                  height={50}
                  prefix="false"
                />
              </Box>
            </Link>
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header