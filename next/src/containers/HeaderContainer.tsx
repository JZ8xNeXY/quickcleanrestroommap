import CloseIcon from '@mui/icons-material/Close'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSessionContext } from '@/context/SessionContext'
import Header from '@/presentationals/Header'

const HeaderContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [openAddressSearchModal, setOpenAddressSearchModal] = useState(false)
  const [openAddSimpleRestroomModal, setOpenAddSimpleRestroomModal] =
    useState(false)
  const router = useRouter()
  const { currentUser } = useSessionContext()

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
    { text: 'TOP', href: '/' },
    { text: '紹介', href: '/about' },
    {
      text: 'お問い合わせ',
      href: 'https://forms.gle/1iJ3NJXDwybWpZuh9',
    },
    { text: '利用規約', href: '/termsofuse' },
    { text: 'プライバシーポリシー', href: '/privacypolicy' },
    ...(currentUser?.id
      ? [{ text: 'サインアウト', href: '/sign_out' }]
      : [{ text: 'サインイン', href: '/sign_in' }]),
  ]

  const SideBar = () => (
    <Box
      role="presentation" //アクセシビリティ対応
      onClick={() => openDrawer(false)}
      onKeyDown={() => openDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <CloseIcon sx={{ m: 1 }} onClick={closeDrawer} />
      </Box>
      <List>
        {DrawerMenuItems.map(({ text, href }) => (
          <ListItem
            component={NextLink}
            href={href}
            key={text}
            onClick={closeDrawer}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Header
      router={router}
      user={currentUser}
      isOpen={isOpen}
      openDrawer={openDrawer}
      openAddressSearchModal={openAddressSearchModal}
      setOpenAddressSearchModal={setOpenAddressSearchModal}
      openAddSimpleRestroomModal={openAddSimpleRestroomModal}
      setOpenAddSimpleRestroomModal={setOpenAddSimpleRestroomModal}
      sideBar={SideBar}
    />
  )
}

export default HeaderContainer
