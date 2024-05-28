import CloseIcon from '@mui/icons-material/Close'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import Header from '@/presentationals/Header'

const HeaderContainer = () => {
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

  return <Header isOpen={isOpen} openDrawer={openDrawer} list={list} />
}

export default HeaderContainer
