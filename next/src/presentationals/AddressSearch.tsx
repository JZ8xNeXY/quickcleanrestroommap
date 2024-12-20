import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  TextField,
  Alert,
  Stack,
} from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { AddressSearchTextField } from './FormTextField'
import { AddressSearchProps } from '@/interface/addressSearchInterface'
import { modalStyle } from '@/styles/modalStyles'

const AddressSearch: React.FC<AddressSearchProps> = ({
  user,
  open,
  onClose,
  handleSubmit,
  onSubmit,
  control,
  warningAddressSearchMessage,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Container maxWidth="sm">
          <Box sx={{ mb: 2, pt: 4 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 24, mb: 5, color: 'black', fontWeight: 'bold' }}
            >
              地名から検索する
            </Typography>
            {warningAddressSearchMessage && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {warningAddressSearchMessage}
              </Alert>
            )}
            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={1.5}
            >
              <AddressSearchTextField
                name="addressSearch"
                control={control}
                label="住所"
              />
              <Controller
                name="userId"
                control={control}
                defaultValue={user?.id}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="ユーザーID"
                    sx={{ backgroundColor: 'white' }}
                    style={{ display: 'none' }}
                  />
                )}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ fontWeight: 'bold', color: 'white' }}
              >
                検索する
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Modal>
  )
}

export default AddressSearch
