/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown') {
        const keyboardEvent = event as React.KeyboardEvent
        if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'Shift') {
          return
        }
      }
      setIsOpen(open)
    }

  const closeDrawer = () => {
    setIsOpen(!isOpen)
  }

  const DrawerMenuItems = [
    { text: '紹介', href: '/' },
    { text: '新規登録', href: '/' },
    { text: 'ログイン', href: '/' },
    { text: 'お問い合わせ', href: '/' },
    { text: '利用規約', href: '/' },
    { text: 'プライバシーポリシー', href: '/' },
  ]

  const list = () => (
    <Box
      role="presentation"
      onClick={openDrawer(false)}
      onKeyDown={openDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <CloseIcon sx={{ m: 1 }} onClick={closeDrawer} />
      </Box>
      <List>
        {DrawerMenuItems.map(({ text, href }) => (
          <Link href={href} passHref key={text}>
            <ListItem>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

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
